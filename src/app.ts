import router  from './routers/router';
const express = require('express');
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://giashsw11:Mnabcdefg@contactcatalog.6icc7j3.mongodb.net/contact-info', { useUnifiedTopology: true, useNewUrlParser: true } as any)
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));
app.use(express.json());
app.use(router);

export default app;
