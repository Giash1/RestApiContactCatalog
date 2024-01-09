import Contact from '../models/contact';
import { Request, Response } from 'express';


import { validateEmail, validateZipCode, validatePersonalNumber, validateText } from '../src/validation';

export async function createContact(req: Request, res: Response) {
    const { firstname, lastname, email, personalnumber, address, phone } = req.body;

    // Validate input
    if (!validateText(firstname)) return res.status(400).json({ error: 'firstname is missing' });
    if (!validateText(lastname)) return res.status(400).json({ error: 'lastname is missing' });
    if (!validateEmail(email)) return res.status(400).json({ error: 'email is not valid' });
    if (!validatePersonalNumber(personalnumber)) return res.status(400).json({ error: 'personalnumber is not valid' });
    if (!validateText(address.street)) return res.status(400).json({ error: 'address.street is missing' });
    if (!validateText(address.city)) return res.status(400).json({ error: 'address.city is missing' });
    if (!validateZipCode(address.zipCode)) return res.status(400).json({ error: 'address.zipCode is not valid' });
    if (!validateText(address.country)) return res.status(400).json({ error: 'address.country is missing' });
    if (!validateText(phone)) return res.status(400).json({ error: 'phone is missing' });

    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}