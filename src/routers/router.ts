import express from 'express';
import { getContacts, getContactById, createContact } from '../controller/contactController';

const router = express.Router();

router.post('/contact', createContact);
router.get('/contact', getContacts);
router.get('/contact/:id', getContactById);

export default router;
