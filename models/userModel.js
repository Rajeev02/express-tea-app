let users = []; // Array to store user data
let id = 0; // ID counter

class UserModel {
    // Add single or multiple users
    static addUser(userData) {
        if (Array.isArray(userData)) {
            const newUsers = userData.map(user => {
                const { name, email, password, role, status } = user;
                return { id: ++id, name, email, password, role, status };
            });
            users.push(...newUsers);
            return newUsers;
        } else {
            const { name, email, password, role, status } = userData;
            const newUser = { id: ++id, name, email, password, role, status };
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

    // Update a single user by ID
    static updateUserById(userId, updatedData) {
        const user = users.find(user => user.id === parseInt(userId));
        if (user) {
            user.name = updatedData.name || user.name;
            user.email = updatedData.email || user.email;
            user.password = updatedData.password || user.password;
            user.role = updatedData.role || user.role;
            user.status = updatedData.status || user.status;
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
                user.name = update.name || user.name;
                user.email = update.email || user.email;
                user.password = update.password || user.password;
                user.role = update.role || user.role;
                user.status = update.status || user.status;
                updatedUsers.push(user);
            }
        });
        return updatedUsers;
    }

    // Delete a single user by ID
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
    static deleteAllUser() {
        const initialLength = users.length;
        users = []; // Reset the array
        id = 0; // Reset the ID counter
        return initialLength; // Return the number of deleted users
    }
}

export default UserModel;


// let users = [];
// let userId = 0;

// export const addUser = ({ name, email, password, role, status }) => {
//     userId++;
//     const newUser = { id: userId, name, email, password, role, status, createdAt: new Date(), updatedAt: new Date() };
//     users.push(newUser);
//     return newUser;
// };

// export const getUsers = () => users;

// export const getUserById = (id) => users.find(user => user.id === id);

// export const updateUser = (id, updates) => {
//     const user = getUserById(id);
//     if (user) {
//         Object.assign(user, updates, { updatedAt: new Date() });
//     }
//     return user;
// };

// export const deleteUser = (id) => {
//     const index = users.findIndex(user => user.id === id);
//     if (index !== -1) {
//         users.splice(index, 1);
//         return true;
//     }
//     return false;
// };

// export const deleteAllUsers = () => {
//     users = [];
//     return true;
// };