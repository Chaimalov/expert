import productsService from './productsService';
import userService from './userService';
import { sendEmail } from '../sendMassage';
import { User } from '../types/user';

const getExpiredProducts = async (userId: string, notifyBefore: number) => {
  const usersProducts = await productsService.getProductsByUser(userId);

  const expiredProducts = usersProducts.filter((product) => {
    if (!product.expiryDate) return false;

    const notifyDate = productsService.addDaysToDate(new Date(), -notifyBefore);

    return product.expiryDate <= notifyDate;
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
      console.log('------extracting users data------');
      sendEmailToUser(user);
    });
  }
};

export default {
  sendEmailToExpired,
};
