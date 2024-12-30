import express from 'express';
import User from '../models/UserModel.js';
import logger from '../logger.js';

const router = express.Router();


// Add multiple users
router.post('/new_users', async (req, res) => {
    try {
        const users = req.body; // Expecting an array of user objects
        if (Array.isArray(users) && users.length > 0) {
            const result = await User.insertMany(users);
            logger.info(`Users added successfully: ${result.length} users`);
            res.status(201).send({ message: `${result.length} user(s) added successfully`, users: result });
        } else {
            logger.warn('Invalid request: No users provided');
            res.status(400).send('Invalid request: No users provided');
        }
    } catch (error) {
        logger.error('Error adding users', error);
        res.status(500).send(error.message);
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        logger.info('User added successfully', user);
        res.status(201).send(user);
    } catch (error) {
        logger.error('Error adding user', error);
        res.status(500).send(error.message);
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        logger.info('Fetched all users', users);
        res.status(200).send({ users: users, count: users.length, message: users.length > 0 ? 'Users fetched successfully' : 'Users Not Found in database' });
    } catch (error) {
        logger.error('Error fetching users', error);
        res.status(500).send(error.message);
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            logger.info('Fetched user by ID', user);
            res.status(200).send(user);
        } else {
            logger.warn('User not found', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error fetching user by ID', error);
        res.status(500).send(error.message);
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            logger.info('User updated successfully', user);
            res.status(200).send(user);
        } else {
            logger.warn('User not found for update', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error updating user', error);
        res.status(500).send(error.message);
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            logger.info('User deleted successfully', user);
            res.status(200).send('User deleted successfully');
        } else {
            logger.warn('User not found for deletion', { id: req.params.id });
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error('Error deleting user', error);
        res.status(500).send(error.message);
    }
});

//Delete Multiple Users by ids
router.delete('/', async (req, res) => {
    try {
        const { ids } = req.body; // Extract the IDs from the request body
        if (ids && Array.isArray(ids) && ids.length > 0) {
            // Use the $in operator to match any of the provided IDs
            const result = await User.deleteMany({ _id: { $in: ids } });

            if (result.deletedCount > 0) {
                logger.info(`Users deleted successfully: ${result.deletedCount}`);
                res.status(200).send(`${result.deletedCount} user(s) deleted successfully`);
            } else {
                logger.warn('No users found for deletion');
                res.status(404).send('No users found for deletion');
            }
        } else {
            logger.warn('Invalid request: No IDs provided');
            res.status(400).send('Invalid request: No IDs provided');
        }
    } catch (error) {
        logger.error('Error deleting users', error);
        res.status(500).send(error.message);
    }
});

export default router;
