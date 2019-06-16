import express from 'express';
import createUser from '../controller/createUser';
import loginController from '../controller/login';
import sanitizer from '../middleware/sanitizer';
import loans from '../controller/loans';
import application from '../controller/apply';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/createUser', createUser.register);
router.post('/login', sanitizer.loginTrimWhitespace(), loginController.logIn);
router.get('/loans', Auth.auth, loans.getAvailableLoans);
router.post('/apply', Auth.auth, sanitizer.applySanitizer(), application.apply);

export default router;
