import * as bcrypt from 'bcryptjs'
import { Users } from "../controllers/userController";
import { Account } from "../types/interfaces";

export async function hashPassword( password: string ) {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash( password, salt )
    return hashedPassword;
}

export async function comparePasswords( password: string, hashed: string ) {
    const match: boolean = await bcrypt.compare(password, hashed)
    return match
}

export const getUser =  ( parameterValue: string, match: string | undefined ): Promise<Account | null> => { 
    
    return new Promise<Account | null>((resolve, reject) => {
        if ( parameterValue === 'id') {
            
        Users.findOne({ id: match }, (err: Error | null, doc: Account) => {
        if (err) {
            reject(err);
        } else {
            resolve(doc);
        }
    })} else if ( parameterValue === 'username') {
        Users.findOne({ username: match }, (err: Error | null, doc: Account) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    } 
})}