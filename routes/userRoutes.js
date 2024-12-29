import express from 'express';
import {
    createUser,
    getAllUsers,
    getUser,
    updateUserById,
    deleteUserById,
    deleteAllUsers,
} from '../controllers/userController.js';
import logger from '../logger.js';

const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
    logger.info('Incoming Request', {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        body: req.body,
    });
    next();
});

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

// Delete all users
// router.deleteUsers('/delete_all_users', deleteAllUsers);

export default router;