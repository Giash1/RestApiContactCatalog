

import { createContact, getContact as getContactController } from './contactController';
import Contact from '../models/contact';
import { Request, Response } from 'express';

// creating contact
describe('createContact', () => {
    it('should create a new contact and return a 200 status', async () => {
        const saveSpy = jest.spyOn(Contact.prototype, 'save');
        saveSpy.mockResolvedValueOnce({} as any);

        const req = {
            body: {
                firstname: 'Anna',
                lastname: 'Andersson',
                email: 'anna.andersson@gmail.com',
                personalnumber: '550713-1405',
                address: {
                    street: 'Development Street 12',
                    city: 'Stockholm',
                    zipCode: '111 22',
                    country: 'Sweden'
                },
                phone: '1234567890'
            }
        } as Request;

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await createContact(req, res);

        expect(saveSpy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.status).not.toHaveBeenCalled();

        saveSpy.mockRestore();
    });
});


// getting all contacts
describe('getContacts', () => {
    it('should get all contacts and return a 200 status', async () => {
        const findSpy = jest.spyOn(Contact, 'find');
        findSpy.mockResolvedValueOnce([] as any);

        const req = {} as Request;
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await getContact(req, res);

        expect(findSpy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        expect(res.status).not.toHaveBeenCalled();

        findSpy.mockRestore();
    });
});


// getting a contact by id

describe('getContactById', () => {
    it('should get a contact by id and return a 200 status', async () => {
        const req = {
            params: {
                id: 'someId'
            }
        } as unknown as Request;

        const findByIdSpy = jest.spyOn(Contact, 'findById');

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await getContact(req, res);

        expect(findByIdSpy).toHaveBeenCalledWith('someId');
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.status).not.toHaveBeenCalled();

        findByIdSpy.mockRestore();
    });


    it('should return a 404 status if the contact is not found', async () => {
        const req = {
            params: {
                id: 'someId'
            }
        } as unknown as Request;

        const findByIdSpy = jest.spyOn(Contact, 'findById');
        findByIdSpy.mockResolvedValueOnce({} as any);
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await getContact(req, res);

        expect(findByIdSpy).toHaveBeenCalledWith('someId');
        expect(res.json).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);

        findByIdSpy.mockRestore();
    });
});
   
export async function getContact(req: Request, res: Response) {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getContactById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
