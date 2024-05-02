import { Request, Response } from 'express';
import { Note, Account, postNote } from '../types/interfaces';
import { getNote, getAllNotes, userFromToken } from '../services/notesServices';
import { getUser } from '../services/userServices'
import { v4 as uuidv4 } from 'uuid'
import { Notes } from '../models/repository'

// Get all the notes from a specific user
export const getNotes = async (req: Request, res: Response) => {
    
    const userId: string = await userFromToken(req.headers.authorization)
    const user: Account | null = await getUser( 'id', userId)
    const userNotes: Note[] = await getAllNotes(user?.userId)

    try {
        if (user === null) { 
            res.status(404).json('Not a recognized user!')
        } else if (userNotes.length === 0) {
            res.status(404).json('You have no saved Notes yet!')
        } else {
            res.status(200).json(userNotes); 
        }
    } catch (error: unknown) {
        res.status(500).json('error!')
    }
}

// Post a new note to the Notes database
export const postNotes = async (req: Request, res: Response) => {

    const PostNote: postNote = await req.body;
    const now: Date = new Date();
    const user: Account | null = await getUser( 'username', PostNote.username );

    try {
        if (user === null) {
            res.status(404).json('Not a recognized user!');
        } else if (PostNote.title === undefined || PostNote.text === undefined) {
            res.status(400).json('Your Note is not correct!')
        } else {
        const newEntry: Note = {
            user: user.userId,
            noteId: uuidv4(),
            title: PostNote.title,
            text: PostNote.text,
            createdAt: now,
            modifiedAt: now
        }
        console.log('newEntry', newEntry)
        Notes.insert(newEntry);
        res.status(200).json('your note is saved')}
    } catch (error: unknown) {
        res.status(500).json('error!')
    }
}

// Update a specific note in Notes database
export const putNotes = async (req: Request, res: Response) => {

    const now: Date = new Date()
    const user: Account | null = await getUser( 'username', req.body.username)
    const userNote: Note | null = await getNote( 'id', req.body.id)

    try {
        if (user === null) {
            res.status(404).json('Not a recognized user!')
        } else if ( userNote === null ) {
            res.status(400).json('Not a recognized Note!')
        } else {
            Notes.update({noteId: req.body.id}, { $set: { text: req.body.text, modifiedAt: now}} , { upsert: false });
            res.status(200).json('Your Note has been updated!');
        }
    } catch (error: unknown) {
        res.status(500).json('error!')
    }
    
}

// Delete a specific note in Notes database
export const deleteNotes = async (req: Request, res: Response) => {

    const userId: string = await userFromToken(req.headers.authorization)
    const user: Account | null = await getUser( 'id', userId)
    const userNote: Note | null = await getNote( 'id', req.params.id)

    try {
        if (user === null) {
            res.status(404).json('Not a recognized user!')
        } else if ( userNote === null ) {
            res.status(400).json('Not a recognized Note!')
        } else {
        Notes.remove({ noteId: req.params.id });
        res.status(200).json('Your Note has been removed!')
        }
    } catch (error: unknown) {
        res.status(500).json('error!')
    }  
}

// Search for a specific note in the Notes database
export const searchNotes = async ( req: Request, res: Response) =>{
    
    const userId: string = await userFromToken(req.headers.authorization)
    const user: Account | null = await getUser( 'id', userId)
    const userNote: Note | null = await getNote('title', String(req.params.title))

    try {
        if (user === null) {
            res.status(404).json('Not a recognized user!')
        } else if ( userNote === null ) {
            res.status(404).json('Not an existing Note!')
        } else if ( userNote.user !== user.userId ) { 
            res.status(404).json('Not a note made by the user')
        } else {
          res.status(200).json(userNote) 
        }
    } catch (error: unknown) {
        res.status(500).json('error!')
    }  
}