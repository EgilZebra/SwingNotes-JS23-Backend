import express, { Router } from 'express';
import { deleteNotes, getNotes, postNotes, putNotes, searchNotes } from '../controllers/notesController';

export const notes: Router = express.Router()

notes.get('/notes',  getNotes)
notes.post('/notes', postNotes)
notes.put('/notes', putNotes)
notes.delete('/notes', deleteNotes)
notes.get('/notes/search', searchNotes )