import { db } from "../firebase.js";
const collectUsersWithProduct = async (productId) => {
    return await (await db.users.select(`products.${productId}.expiryDays`).get()).docs.map((doc) => doc.data());
};
export default {
    collectUsersWithProduct,
};
