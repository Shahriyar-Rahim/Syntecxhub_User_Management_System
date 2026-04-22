import express from 'express';
import userController from '../controllers/user.controller.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// GET /users (View all) or /users?id=123 (View one)
router.get('/', userController.getUsers);

// CREATE (Admin/Manual creation)
router.post('/create',  protect, verifyAdmin, userController.createUser);

// UPDATE (requires ID in URL)
router.put('/:id', protect, verifyAdmin, userController.updateUser);

// DELETE ONE
router.delete('/:id', protect, verifyAdmin, userController.deleteOne);

// DELETE MANY (Expects array of IDs in request body)
router.delete('/',  protect, verifyAdmin, userController.deleteMany);

export default router;