import { db } from '../firebase';

const collectUsersWithProduct = async (productId: string) => {
  return await (
    await db.users.select(`products.${productId}.expiryDays`).get()
  ).docs.map((doc) => doc.data());
};

export default {
  collectUsersWithProduct,
};
