import express from 'express'
const router = express.Router();
import userController from '../controllers/userController.js';
import adminController from '../controllers/adminController.js';
import checkUserAuth from '../config/middleware.js'


// authenticate route
router.use('/change_password',checkUserAuth)
router.use('/admin/doc', checkUserAuth)


// public routes

router.post('/', userController.userSignUp)
router.get('/login', userController.userlogIn)
router.post('/change_password', userController.Change_Password)

// Admin route
router.post('/admin/signup', adminController.adminsignup)
router.get('/admin/login', adminController.adminlogin)
router.get('/admin/doc', adminController.getAllDoc)
export default router