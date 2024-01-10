import express from 'express';
import mongoose from 'mongoose';
import Contact from './models/contact';
import bodyParser from 'body-parser';
import { MongoError } from 'mongodb';

const app = express();
app.use(bodyParser.json());

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts); // sends the data as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (error) {
        if (error instanceof mongoose.Error && error instanceof MongoError && error.code === 11000) {
            res.status(400).json({ message: 'Email is already used' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Error creating contact' });
        }
    }
});

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb+srv://giashsw11:Mnabcdefg@contactcatalog.6icc7j3.mongodb.net/contact-info';

const connectOptions: any = {
    useUnifiedTopology: true
};

mongoose.connect(DB_URI, connectOptions)
    .then(async () => {
        await Contact.createIndexes();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((error) => {
        console.error('Error connecting to database: ', error);
    });
