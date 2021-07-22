import express from 'express';
import users from '../controller/userController';
// import { validEmail, userExists, checkSignupInput } from '../helpers/index';

const router = express.Router();

router.post('/signup', users.signup);

export default router;
