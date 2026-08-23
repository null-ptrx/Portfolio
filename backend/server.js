import express from 'express';
import 'dotenv/config'
import { connectDb } from './config/db.js'
import { contact } from './models/contactSchema.js';
import { project } from './models/projectSchema.js';
import cors from 'cors'

const app = express();
// app.use(cors());
// app.use(cors({
//     origin: 'https://portfolio-2fq5ua02p-ds331048-5589s-projects.vercel.app', // your actual Vercel URL
// }));

const allowedOrigins = [
    'http://localhost:5173',
    'https://portfolio-2fq5ua02p-ds331048-5589s-projects.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/contact', async (req, res) => {
   
    try {
        console.log(req.body);
        const userContact = await contact.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        res.status(200).json(userContact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'failed to create contact' });
    }
});

app.post('/api/project', async (req, res) => {
    console.log('dhami')
    try {
        console.log(req.body);
        const projects = await project.create({
            name: req.body.name,
            discreption: req.body.discreption,
            github: req.body.github,
            docker: req.body.docker,
            live: req.body.live,
        });
        res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'failed to add this project' });
    }
});

app.get('/api/contact', async (req, res) => {
    try {
        let users = await contact.find(); 
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'failed to get users' });
    }
});

app.get('/api/project', async (req, res) => {
    try {
        let projects = await project.find();
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'failed to get projects' });
    }
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
