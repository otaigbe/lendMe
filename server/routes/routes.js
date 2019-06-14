import express from 'express';
import createUser from '../controller/createUser';

const router = express.Router();

router.post('/createUser', createUser.register);

export default router;
