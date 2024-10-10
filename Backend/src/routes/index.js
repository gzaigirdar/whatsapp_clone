import express from 'express'
import authroutes from './auth.router.js'

const router = express.Router()

router.use('/auth',authroutes)

export default router;