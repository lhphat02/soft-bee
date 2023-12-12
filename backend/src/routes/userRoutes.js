import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.addUser);
router.post('/login', UserController.loginUser);

module.exports = router;
