import Contact from '../models/contact';
import { Request, Response } from 'express';

export async function createContact(req: Request, res: Response) {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}