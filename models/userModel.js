// models/UserModel.js

let users = [];
let id = 0;

class UserModel {
    // Add a single or multiple users
    static addUser(userData) {
        if (Array.isArray(userData)) {
            const newUsers = userData.map(user => {
                const { email, username, password, name, role } = user;
                return { id: ++id, email, username, password, name, role };
            }).filter(user => user !== null); // Remove null values (duplicate entries)
            users.push(...newUsers);
            return newUsers;
        } else {
            const { email, username, password, name, role } = userData;
            // Check if user with the same email or username already exists
            const newUser = { id: ++id, email, username, password, name, role };
            users.push(newUser);
            return newUser;
        }
    }

    // Get all users
    static getAllUsers() {
        return users;
    }

    // Get a user by ID
    static getUserById(userId) {
        return users.find(user => user.id === parseInt(userId));
    }

    // Update a user by ID
    static updateUserById(userId, updatedData) {
        const user = users.find(user => user.id === parseInt(userId));
        if (user) {
            user.email = updatedData.email || user.email;
            user.username = updatedData.username || user.username;
            user.password = updatedData.password || user.password;
            user.name = updatedData.name || user.name;
            user.role = updatedData.role || user.role;
            return user;
        }
        return null;
    }

    // Bulk Update Users
    static bulkUpdateUsers(userUpdates) {
        const updatedUsers = [];
        userUpdates.forEach(update => {
            const user = users.find(u => u.id === update.id);
            if (user) {
                user.email = update.email || user.email;
                user.username = update.username || user.username;
                user.password = update.password || user.password;
                user.name = update.name || user.name;
                user.role = update.role || user.role;
                updatedUsers.push(user);
            }
        });
        return updatedUsers;
    }

    // Delete a user by ID
    static deleteUserById(userId) {
        const index = users.findIndex(user => user.id === parseInt(userId));
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    }

    // Bulk Delete Users
    static bulkDeleteUsers(ids) {
        const initialLength = users.length;
        users = users.filter(user => !ids.includes(user.id));
        return initialLength - users.length;
    }

    // Delete All Users
    static deleteAllUsers() {
        const initialLength = users.length;
        users = []; // Reset the array
        id = 0; // Reset the ID counter
        return initialLength; // Return the number of deleted users
    }
}

export default UserModel;
