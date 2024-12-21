let users = [];
let userId = 0;

export const addUser = ({ name, email, password, role, status }) => {
    userId++;
    const newUser = { id: userId, name, email, password, role, status, createdAt: new Date(), updatedAt: new Date() };
    users.push(newUser);
    return newUser;
};

export const getUsers = () => users;

export const getUserById = (id) => users.find(user => user.id === id);

export const updateUser = (id, updates) => {
    const user = getUserById(id);
    if (user) {
        Object.assign(user, updates, { updatedAt: new Date() });
    }
    return user;
};

export const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
