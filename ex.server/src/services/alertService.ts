import productsService from './productsService';
import userService from './userService';
import { sendEmail } from '../sendMassage';
import { User } from '../types/user';

const getExpiredProducts = async (userId: string, notifyBefore: number) => {
  try {
    const usersProducts = await productsService.getProductsByUser(userId);

    const expiredProducts = usersProducts.filter((product) => {
      if (!product.expiryDate) return false;

      const notifyDate = productsService.addDaysToDate(
        new Date(),
        -notifyBefore
      );

      return product.expiryDate <= notifyDate;
    });

    return expiredProducts;
  } catch (error) {
    console.error('Error getting expired products:', error);
    return [];
  }
};

const sendEmailToUser = (user: User) => {
  if (user.email && user.notifyBefore) {
    const products = getExpiredProducts(user.id, user.notifyBefore);
    const subject = `your products are getting expired!`;
    const message = `products: ${products}`;

    sendEmail(user.email, subject, message);
  }
  else {
    console.log("user doesn't have email or notifyBefore");
  }
};

const sendEmailToExpired = async () => {
  try {
    const users = await userService.getAllUsers();
    console.log(users);
    if (users) {
      users.forEach((user) => {
        sendEmailToUser(user);
      });
    }
  } catch (error) {
    console.error('Error sending email to expired users:', error);
  }
};

export default {
  sendEmailToExpired,
};
