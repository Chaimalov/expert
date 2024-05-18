import { db } from "../firebase.js";

const collectUsersWithProduct = async (productId: string) => {
  return await (
    await db.users.select(`products.${productId}.expiryDays`).get()
  ).docs.map((doc) => doc.data());
};

export default {
  collectUsersWithProduct,
};
