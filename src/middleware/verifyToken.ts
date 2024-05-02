import jwt from "jsonwebtoken";
import {  NextFunction, Request, Response } from 'express';

export const verifyToken = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
    if (!req.headers['authorization']) { return res.status(400).send('Access Unauthorized!') }
    const token: string = req.headers['authorization'];
    jwt.verify(token.replace('Bearer ', ''), String(process.env.JWT_SECRET), (err) => {
        if (err) {
            return res.status(400).send('Access Unauthorized!')
        }
        return next()
    })
}
