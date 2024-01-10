

import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    personalnumber: String,
    address: {
        street: String,
        city: String,
        zipCode: String,
        country: String
    },
    phone: String
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
