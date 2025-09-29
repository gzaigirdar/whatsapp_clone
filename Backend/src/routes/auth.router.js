import express from 'express'
import { refresh_token, register } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';

import { logout } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/register').post(trimRequest.all,register);
router.route('/login').post(trimRequest.all,login);
router.route('/logout').post(trimRequest.all,logout);
router.route('/refreshToken').post(trimRequest.all,refresh_token)
router.route('/testingauthmiddleware').get(trimRequest.all, authMiddleware,((req,res)=>{
    res.send('test auth route has been visited');

}))

export default router;
