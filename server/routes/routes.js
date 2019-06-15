import express from 'express';
import createUser from '../controller/createUser';
import loginController from '../controller/login';
import sanitizer from '../middleware/sanitizer';

const router = express.Router();

router.post('/createUser', createUser.register);
router.post('/login', sanitizer.loginTrimWhitespace(), loginController.logIn);

export default router;
