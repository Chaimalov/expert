import productsService from "./productsService.js";
import userService from "./userService.js";
import { sendEmail } from "../sendMassage.js";
import { User } from "../types/user.js";





const getExpiredProducts = async (userId: string, notifyBefore: number) => {
  const usersProducts = await productsService.getProductsByUser(userId);
  const expiredProducts = usersProducts.filter((product) => {
    if (product.expiryDate) {
      return (
        product.expiryDate <= productsService.addDaysToDate(new Date(), -notifyBefore)
      );
    }
  });

  return expiredProducts;
};

const sendEmailToUser = (user: User) => {
  if (user.email && user.notifyBefore) {
    const products = getExpiredProducts(user.id, user.notifyBefore);
    const subject = `your products are getting expired!`;
    const message = `products: ${products}`;

    sendEmail(user.email, subject, message);
  }
};

const sendEmailToExpired = async () => {
  const users = await userService.getAllUsers();
  if (users) {
    users.forEach((user) => {
      console.log("------extracting users data------");
      sendEmailToUser(user);
    });
  }
};

export default {
  sendEmailToExpired,
};
