let projects = [];
let projectId = 0;

export const addProject = ({ userId, title, description, startDate, endDate, status }) => {
    projectId++;
    const newProject = {
        id: projectId,
        userId,
        title,
        description,
        startDate,
        endDate,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    projects.push(newProject);
    return newProject;
};

export const getProjectsByUserId = (userId) => projects.filter(project => project.userId === userId);