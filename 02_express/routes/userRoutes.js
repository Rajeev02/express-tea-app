import express from 'express';
import { createUser, getAllUsers, getUser, updateUserById, deleteUserById } from '../controllers/userController.js';

const router = express.Router();

// Create a new user with profile and projects
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUser);

// Update a user by ID
router.put('/:id', updateUserById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

export default router;
