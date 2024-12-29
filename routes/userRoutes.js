import express from 'express';
import UserModel from '../models/UserModel.js';
import logger from '../logger.js';

const router = express.Router();

// Add a new user or multiple users
router.post('/', (req, res) => {
    try {
        const userData = req.body;
        const result = UserModel.addUser(userData);

        if (result === null) {
            logger.warn('Duplicate user entry attempted');
            return res.status(400).send({ message: 'User with the same email or username already exists.' });
        }

        if (Array.isArray(result)) {
            logger.info('Users added successfully', { users: result });
            res.status(201).send({ message: 'Users added successfully', users: result });
        } else {
            logger.info('User added successfully', result);
            res.status(201).send(result);
        }
    } catch (error) {
        logger.error('Error adding user(s)', error);
        res.status(500).send('An error occurred while adding user(s).');
    }
});

// Get all users
router.get('/', (req, res) => {
    try {
        const users = UserModel.getAllUsers();
        logger.info('Fetched all users', { users });
        res.status(200).send(users);
    } catch (error) {
        logger.error('Error fetching users', error);
        res.status(500).send('An error occurred while fetching users.');
    }
});

// Get a user by ID
router.get('/:id', (req, res) => {
    try {
        const user = UserModel.getUserById(req.params.id);
        if (user) {
            logger.info('Fetched user by ID', { id: req.params.id, user });
            res.status(200).send(user);
        } else {
            logger.warn('User not found', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error fetching user by ID', error);
        res.status(500).send('An error occurred while fetching the user.');
    }
});

// Update a single user by ID
router.put('/:id', (req, res) => {
    try {
        const updatedUser = UserModel.updateUserById(req.params.id, req.body);
        if (updatedUser) {
            logger.info('User updated successfully', { id: req.params.id, updatedUser });
            res.status(200).send(updatedUser);
        } else {
            logger.warn('User not found for update', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error updating user', error);
        res.status(500).send('An error occurred while updating the user.');
    }
});

// Bulk Update Users
router.put('/', (req, res) => {
    try {
        const userUpdates = req.body;
        if (!Array.isArray(userUpdates)) {
            logger.warn('Invalid bulk update request', { body: req.body });
            return res.status(400).send('Expected an array of user updates');
        }
        const updatedUsers = UserModel.bulkUpdateUsers(userUpdates);
        if (updatedUsers.length === 0) {
            logger.warn('No users updated', { userUpdates });
            res.status(404).send('No users updated. Check your IDs.');
        } else {
            logger.info('Users updated successfully', { updatedUsers });
            res.status(200).send({ message: 'Users updated successfully', users: updatedUsers });
        }
    } catch (error) {
        logger.error('Error in bulk updating users', error);
        res.status(500).send('An error occurred while updating users.');
    }
});
// Delete All Users
router.delete('/delete_users', (req, res) => {
    try {

        const deletedCount = UserModel.deleteAllUsers();
        if (deletedCount === 0) {
            logger.warn('No users deleted');
            res.status(404).send('No users deleted. Check your IDs.');
        } else {
            logger.info('Users deleted successfully', { deletedCount });
            res.status(200).send({ message: 'Users deleted successfully', deletedCount });
        }
    } catch (error) {
        logger.error('Error in bulk deleting users', error);
        res.status(500).send('An error occurred while deleting users.');
    }
});

// Delete a single user by ID
router.delete('/:id', (req, res) => {
    try {
        const deleted = UserModel.deleteUserById(req.params.id);
        if (deleted) {
            logger.info('User deleted successfully', { id: req.params.id });
            res.status(200).send('User deleted successfully');
        } else {
            logger.warn('User not found for deletion', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error deleting user by ID', error);
        res.status(500).send('An error occurred while deleting the user.');
    }
});

// Bulk Delete Users
router.delete('/', (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            logger.warn('Invalid bulk delete request', { body: req.body });
            return res.status(400).send('Expected an array of user IDs');
        }
        const deletedCount = UserModel.bulkDeleteUsers(ids);
        if (deletedCount === 0) {
            logger.warn('No users deleted', { ids });
            res.status(404).send('No users deleted. Check your IDs.');
        } else {
            logger.info('Users deleted successfully', { deletedCount });
            res.status(200).send({ message: 'Users deleted successfully', deletedCount });
        }
    } catch (error) {
        logger.error('Error in bulk deleting users', error);
        res.status(500).send('An error occurred while deleting users.');
    }
});




export default router;
