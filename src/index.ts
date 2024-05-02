import express, { Express } from 'express';
require('dotenv').config();
import { notes } from './routes/notesRouter';
import { user } from './routes/userRouter';
import { verifyToken } from './middleware/verifyToken';
import { swagServe, swagSetup } from './Swagger/swaggerOptions';

const app: Express  = express();
const PORT: number  = Number(process.env.PORT);
const BASE_URL: string  = String(process.env.BASE_URL);

app.use(express.json())
app.use('/api/notes', verifyToken, notes);
app.use('/api/user', user);
app.use('/api-docs', swagServe, swagSetup);

app.listen( PORT, BASE_URL, () => {
    console.log(`SwingNotes loaded on ${BASE_URL} and ${PORT}.`);
    console.log('Server is up and running!');
})