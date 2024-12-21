let profiles = [];
let profileId = 0;

export const addProfile = ({ userId, firstName, lastName, phone, address, avatar, cover }) => {
    profileId++;
    const newProfile = {
        id: profileId,
        userId,
        firstName,
        lastName,
        phone,
        address,
        avatar,
        cover,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    profiles.push(newProfile);
    return newProfile;
};

export const getProfileByUserId = (userId) => profiles.find(profile => profile.userId === userId);