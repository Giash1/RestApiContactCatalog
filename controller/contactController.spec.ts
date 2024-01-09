import { createContact, getContacts, getContactById } from './contactController';
import Contact from '../models/contact';
import { Request, Response } from 'express';

// Mock the individual methods of the Contact model
Contact.prototype.save = jest.fn();
Contact.find = jest.fn();
Contact.findById = jest.fn();

// creating contact
describe('creatContact', () => {
    it('should create a new contact and return a 200 status', async () => {
        const saveSpy = jest.spyOn(Contact.prototype, 'save');
        saveSpy.mockImplementationOnce(() => Promise.resolve({} as any));

    

        const req = {
            body: {
                firstname: 'Anna',
                lastname: 'Andersson',
                email: 'anna.andersson@gmail.com',
                personalnumber: '550713-1405',
                address: {
                    street: 'Development Street 12',
                    city: 'Stockholm',
                    zipCode: '12345',
                    country: 'Sweden'
                },
                phone: '1234567890'
            }
        } as Request;

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        console.log('Calling createContact...');

        await createContact(req, res);
        console.log('Checking if spy was called...');
        expect(saveSpy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.status).toHaveBeenCalledWith(201); // expect a 201 status

        saveSpy.mockRestore();
    });
    
})

// getting all contacts
describe('getContacts', () => {
    it('should return an empty array if there are no contacts', async () => {
        const findSpy = jest.spyOn(Contact, 'find');
        findSpy.mockResolvedValueOnce([] as any);
        const req = {} as Request;
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await getContacts(req, res);

        expect(findSpy).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([]); // expect a json response
        expect(res.status).not.toHaveBeenCalled();

        findSpy.mockRestore();
    });
});

// getting a contact by id
describe('getContactById', () => {
    it('should get a contact by id and not set the status', async () => {
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

        await getContactById(req, res);

        expect(findByIdSpy).toHaveBeenCalledWith('someId');
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.status).not.toHaveBeenCalled();

        findByIdSpy.mockRestore();
    });

    it('should return a 404 status and a message if the contact is not found', async () => {
        const req = {
            params: {
                id: 'someId'
            }
        } as unknown as Request;

        const findByIdSpy = jest.spyOn(Contact, 'findById');
        findByIdSpy.mockResolvedValueOnce(null as any);

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        await getContactById(req, res);

        expect(findByIdSpy).toHaveBeenCalledWith('someId');
        expect(res.json).toHaveBeenCalledWith({ message: 'Contact not found' });
        expect(res.status).toHaveBeenCalledWith(404);

        findByIdSpy.mockRestore();
    });
});
// Clear all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});