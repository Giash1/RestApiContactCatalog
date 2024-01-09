

import { createContact } from './contactController';
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