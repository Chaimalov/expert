import usersRepository from "../repositories/usersRepository.js";
import { isAdmin } from "./admins.js";
const getUserById = async (id) => {
    let user = await usersRepository.getUser(id);
    if (!user) {
        user = await usersRepository.createUser(id);
    }
    user.isAdmin = isAdmin(id);
    return user;
};
const getAllUsers = async () => {
    return await usersRepository.getAllUsers();
};
const deleteUser = async (userId) => {
    return await usersRepository.deleteUser(userId);
};
const addProduct = async (userId, product) => {
    return await usersRepository.addProductToUsersList(userId, product);
};
const editProduct = async (userId, product) => {
    return await usersRepository.editProductInUsersList(userId, product);
};
const removeProduct = async (userId, productId) => {
    if (!(await isProductExists(userId, productId)))
        throw Error("no product");
    return await usersRepository.removeProductFromUsersList(userId, productId);
};
const deleteProduct = async (productId) => {
    // return await usersRepository.deleteProductFromDB(productId);
};
const isProductExists = async (userId, productId) => {
    var _a, _b;
    const user = await usersRepository.getUser(userId);
    return (_b = (_a = user === null || user === void 0 ? void 0 : user.products) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(productId)) !== null && _b !== void 0 ? _b : false;
};
const updateNotify = async (userId, notifyBefore) => {
    return await usersRepository.updateNotify(userId, notifyBefore);
};
export default {
    getUserById,
    deleteUser,
    addProduct,
    editProduct,
    removeProduct,
    deleteProduct,
    updateNotify,
    getAllUsers,
};
