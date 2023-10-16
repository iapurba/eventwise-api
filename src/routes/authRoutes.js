import express from 'express';
import * as userAuthController from '../controllers/userAuthController.js';
import * as publisherAuthController from '../controllers/publishers/publisherAuthController.js';

const router = express.Router();

router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);
router.post('/publishers/register', publisherAuthController.registerPublisher);
router.post('/publishers/login', publisherAuthController.loginPublisher);

export default router;