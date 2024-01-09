import Contact from '../models/contact';
import { Request, Response } from 'express';


import { validateEmail, validateZipCode, validatePersonalNumber, validateText } from '../src/validation';

export async function createContact(req: Request, res: Response) {
    const { firstname, lastname, email, personalnumber, address, phone } = req.body;

    try {
        console.log('Validating firstname...');
        if (!validateText(firstname)) throw new Error('firstname is missing');
        console.log('Validating lastname...');
        if (!validateText(lastname)) throw new Error('lastname is missing');
        console.log('Validating email...');
        if (!validateEmail(email)) throw new Error('email is not valid');
        console.log('Validating personalnumber...');
        if (!validatePersonalNumber(personalnumber)) throw new Error('personalnumber is not valid');
        console.log('Validating address.street...');
        if (!validateText(address.street)) throw new Error('address.street is missing');
        console.log('Validating address.city...');
        if (!validateText(address.city)) throw new Error('address.city is missing');
        console.log('Validating adrees.zipcode...');
        if (!validateZipCode(address.zipCode)) throw new Error('address.zipCode is not valid');
        console.log('Validating country...');
        if (!validateText(address.country)) throw new Error('address.country is missing');
        console.log('Validating phone...');
        if (!validateText(phone)) throw new Error('phone is missing');
        console.log('All validations passed.');

        console.log('Creating contact...');
        const contact = new Contact(req.body);

        console.log('Saving contact...');
        await contact.save();

        console.log('Contact saved.');
        res.status(201).json(contact);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: error.message });
    }
}


export async function getContacts(req: Request, res: Response) {
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