import { Note } from "../types/interfaces";
import { Notes } from '../models/repository';
import jwt from 'jsonwebtoken';
import { jwtPayload } from '../types/interfaces';

export const getAllNotes = (id: string | undefined): Promise<Note[]> => { 
    return new Promise<Note[]>((resolve, reject) => {
    Notes.find({ user: id }, (err: Error | null, doc: Note[]) => {
        if (err) {
            reject(err);
        } else {
            resolve(doc);
        }
    })
})}

export const getNote = async ( parameterValue: string, id: string | undefined): Promise<Note | null> => { 
    return new Promise<Note | null>(async (resolve, reject) => {
        if ( parameterValue === 'id' ) {
        Notes.findOne({ noteId: id }, (err: Error | null, doc: Note | null) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
    })} else if ( parameterValue === 'title') {
        Notes.findOne({ title: id }, (err: Error | null, doc: Note | null) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
    })
}})}

export const userFromToken = async ( token: string | undefined ) => {

    const stringedToken: string = String(token);
    const decodedToken: jwtPayload =  jwt.decode(stringedToken.replace('Bearer ', '')) as jwtPayload;

    return  decodedToken.user;
}