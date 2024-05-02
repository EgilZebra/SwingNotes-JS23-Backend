import express, { Router } from 'express';
import { userLogin, userSignup } from '../controllers/userController';

export const user: Router = express.Router()

user.post('/user/signup', userSignup)
user.post('/user/login', userLogin)
