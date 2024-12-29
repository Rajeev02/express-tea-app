import logger from '../logger.js';
import UserModel from '../models/userModel.js';
import { addProfile, getProfileByUserId } from '../models/profileModel.js';
import { addProject, getProjectsByUserId } from '../models/projectModel.js';

// Add User with Profile and Projects
export const createUser = (req, res) => {
    try {
        const { name, email, password, role, status, profile, projects } = req.body;

        const newUser = UserModel.addUser({ name, email, password, role, status });
        logger.info('User added successfully', { user: newUser });

        if (profile) {
            addProfile({ userId: newUser.id, ...profile });
            logger.info('Profile added for user', { userId: newUser.id, profile });
        }

        if (projects) {
            projects.forEach((project) => {
                addProject({ userId: newUser.id, ...project });
                logger.info('Project added for user', { userId: newUser.id, project });
            });
        }

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        logger.error('Error creating user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get All Users
export const getAllUsers = (req, res) => {
    try {
        const users = UserModel.getAllUsers();
        logger.info('Fetched all users', { users });
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error fetching all users', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get User by ID with Profile and Projects
export const getUser = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = UserModel.getUserById(id);

        if (!user) {
            logger.warn('User not found', { id });
            return res.status(404).json({ error: 'User not found' });
        }

        const profile = getProfileByUserId(id);
        const projects = getProjectsByUserId(id);

        logger.info('Fetched user by ID', { id, user, profile, projects });
        res.status(200).json({ user, profile, projects });
    } catch (error) {
        logger.error('Error fetching user by ID', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update User
export const updateUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;

        const updatedUser = UserModel.updateUserById(id, updates);

        if (!updatedUser) {
            logger.warn('User not found for update', { id });
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info('User updated successfully', { id, updates });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        logger.error('Error updating user', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete User
export const deleteUserById = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (UserModel.deleteUserById(id)) {
            logger.info('User deleted successfully', { id });
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            logger.warn('User not found for deletion', { id });
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        logger.error('Error deleting user', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Delete All Users
export const deleteAllUsers = (req, res) => {

    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            logger.warn('Invalid bulk delete request', { body: req.body });
            return res.status(400).send('Expected an array of user IDs');
        }
        const deletedCount = UserModel.bulkDeleteUsers(ids);
        if (deletedCount === 0) {
            logger.warn('No User deleted', { ids });
            res.status(404).send('No User deleted. Check your IDs.');
        } else {
            logger.info('Users deleted successfully', { deletedCount });
            res.status(200).send({ message: 'User deleted successfully', deletedCount });
        }
    } catch (error) {
        logger.error('Error in bulk deleting users', error);
        res.status(500).send('An error occurred while deleting users.');
    }

};