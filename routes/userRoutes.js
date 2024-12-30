import express from 'express';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import logger from '../logger.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, username, password, age } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn('User already exists', { email });
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, username, password, age });
        await user.save();
        logger.info('User registered successfully', user);
        res.status(201).json({ message: 'User registered successfully', user, password });
    } catch (error) {
        logger.error('Error registering user', error);
        res.status(500).json({ message: error.message });
    }
});



// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('User not found', { email });
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            logger.warn('Invalid credentials', { email });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        logger.info('Login successful', { email });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        logger.error('Error logging in user', error);
        res.status(500).json({ message: error.message });
    }
});

//Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        logger.info(`Received forgot-password request for email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('User with this email does not exist');
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        logger.info('User found:', user);

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
        await user.save();
        logger.info('Token generated and saved successfully:', token);

        res.status(200).json({ message: 'Password reset token sent to email', token });
    } catch (error) {
        logger.error('Error in forgot password', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            logger.warn('Invalid or expired token');
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined; // Clear token fields
        user.resetPasswordExpires = undefined;
        await user.save();

        logger.info('Password reset successful', user);
        res.status(200).json({ message: 'Password reset successful', user, newPassword });
    } catch (error) {
        logger.error('Error in reset password', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// // Add multiple users
// router.post('/new_users', async (req, res) => {
//     try {
//         const users = req.body; // Expecting an array of user objects
//         if (Array.isArray(users) && users.length > 0) {
//             const result = await User.insertMany(users);
//             logger.info(`Users added successfully: ${result.length} users`);
//             res.status(201).send({ message: `${result.length} user(s) added successfully`, users: result });
//         } else {
//             logger.warn('Invalid request: No users provided');
//             res.status(400).send('Invalid request: No users provided');
//         }
//     } catch (error) {
//         logger.error('Error adding users', error);
//         res.status(500).send(error.message);
//     }
// });

// // Add a new user
// router.post('/', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         logger.info('User added successfully', user);
//         res.status(201).send(user);
//     } catch (error) {
//         logger.error('Error adding user', error);
//         res.status(500).send(error.message);
//     }
// });

//PROTECT ROUTES IF REQUIRED
// route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        logger.info('Fetched all users', users);
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error fetching users', error);
        res.status(500).json({ message: error.message });
    }
});

// protectGet a user by ID
router.get('/:id', protect, async (req, res) => {
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
router.put('/:id', protect, async (req, res) => {
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
router.delete('/:id', protect, async (req, res) => {
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
router.delete('/', protect, async (req, res) => {
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
