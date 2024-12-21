import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../models/userModel.js';
import { addProfile, getProfileByUserId } from '../models/profileModel.js';
import { addProject, getProjectsByUserId } from '../models/projectModel.js';

// Add User with Profile and Projects
export const createUser = (req, res) => {
    try {
        const { name, email, password, role, status, profile, projects } = req.body;

        const newUser = addUser({ name, email, password, role, status });

        if (profile) {
            addProfile({ userId: newUser.id, ...profile });
        }

        if (projects) {
            projects.forEach(project => addProject({ userId: newUser.id, ...project }));
        }

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Get All Users
export const getAllUsers = (req, res) => {
    res.status(200).json(getUsers());
};

// Get User by ID with Profile and Projects
export const getUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const profile = getProfileByUserId(id);
    const projects = getProjectsByUserId(id);

    res.status(200).json({ user, profile, projects });
};

// Update User
export const updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const updatedUser = updateUser(id, updates);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
};

// Delete User
export const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);

    if (deleteUser(id)) {
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};