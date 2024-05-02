import express, { Router } from 'express';
import { deleteNotes, getNotes, postNotes, putNotes, searchNotes } from '../controllers/notesController';

export const notes: Router = express.Router()

notes.get('/',  getNotes);
notes.post('/', postNotes);
notes.put('/', putNotes);
notes.delete('/:id', deleteNotes);
notes.get('/search/:title', searchNotes);