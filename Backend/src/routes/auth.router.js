import express from 'express'
import { refresh_token, regeister } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';

import { logout } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request'
const router = express.Router()

router.route('/regeister').post(trimRequest.all,regeister);
router.route('/login').post(trimRequest.all,login);
router.route('/logout').post(trimRequest.all,logout);
router.route('/refreshToken').post(trimRequest.all,refresh_token)

export default router;
