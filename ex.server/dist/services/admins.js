const admins = [process.env.ADMIN_1_API_KEY, process.env.ADMIN_2_API_KEY];
export const isAdmin = (userId) => {
    return admins.includes(userId);
};
