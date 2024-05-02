import { Request, Response } from 'express';
import { Account, Login } from '../types/interfaces';
import { comparePasswords, hashPassword, getUser } from '../services/userServices';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Users } from '../models/repository'
require('dotenv').config();


export const userSignup = async ( req: Request, res: Response ) =>{

    const hashedPassword: string = await hashPassword(req.body.password)
    const user: Account = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        userId: uuidv4()
        } 

    try {
        if (user) {
            Users.insert(user);
            const token = jwt.sign( {user: user.userId}, String(process.env.JWT_SECRET) , {expiresIn: '30m'});
            console.log(`${user.username}: your account have been created`)
            res.status(200).json(`token: ${token}`);
        } else {
            res.status(400).json('faulty request')
        }
    } catch (error: unknown) {
        res.status(500).json('Error!')
    }
}

export const userLogin = async ( req: Request, res: Response) => {

    const login: Login = req.body;
    const user: Account | null = await getUser( 'username', login.username)

    try {
        if (user === null) {
            res.status(404).json('User not found!')
        } else if ( await comparePasswords(login.password, user.password) ) {
            const token = jwt.sign( {user: user.userId}, String(process.env.JWT_SECRET) , {expiresIn: '30m'});
            console.log('Login sucessful!')
            res.status(200).json(`token: ${token}`);
        } else {
            res.status(400).json('Incorrect password!')
        }
    } catch (error: unknown) {
        res.status(500).json('Error!')
    } 
}

