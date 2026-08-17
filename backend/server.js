import express from 'express';
import 'dotenv/config'
import { connectDb } from './config/db.js'
import { contact } from './models/contactSchema.js';
import { project } from './models/projectSchema.js';

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        await connectDb();
        console.log('db connected');
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on http://${process.env.URL}:${process.env.PORT}`);
        });
    } catch (error){
        console.log('failed to connect db');
        throw error;
    }
}
startServer();
