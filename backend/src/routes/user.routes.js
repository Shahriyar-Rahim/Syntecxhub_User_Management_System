import express from 'express';
import userController from '../controllers/user.controller.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// GET /users (View all) or /users?id=123 (View one)
router.get('/', userController.getUsers);

// CREATE (Admin/Manual creation)
router.post('/create', verifyAdmin, userController.createUser);

// UPDATE (requires ID in URL)
router.put('/:id', userController.updateUser);

// DELETE ONE
router.delete('/:id', userController.deleteOne);

// DELETE MANY (Expects array of IDs in request body)
router.delete('/', userController.deleteMany);

export default router;