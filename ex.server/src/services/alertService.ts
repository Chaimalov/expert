import * as productsService from './productsService';
import * as userService from './usersService';
import { sendEmail } from '../sendMassage';
import { User } from '@expert/common';
import dataCollectService from './dataCollectService';
import { Product } from '@expert/common';
import { addDaysToDate } from '../utils';

const getExpiredProducts = async (userId: string, notifyBefore: number) => {
  try {
    const usersProducts = await productsService.getProductsByUser(userId);

    const expiredProducts = usersProducts.filter((product: Product) => {
      if (!product.expiryDate) return false;
      console.log('getExpiredProducts: ', product);
      const notifyDate = addDaysToDate(new Date(), -notifyBefore);

      return product.expiryDate <= notifyDate;
    });

    return expiredProducts;
  } catch (error) {
    console.error('Error getting expired products:', error);
    return [];
  }
};

const sendEmailToUser = async (user: User) => {
  if (user.id && user.notifyBefore >= 0) {
    const products = await getExpiredProducts(user.id, user.notifyBefore);

    if (products.length > 0) {
      const subject = `your products are getting expired!`;
      const message = `Products: ${products.map((p) => p.name).join(', ')}`;
      try {
        console.log('sending email to user:', user.id);
        sendEmail(user.id, subject, message);
      } catch (error) {
        console.error('Error sending email to user:', error);
      }
    }
  } else {
    console.log("user doesn't have email or notifyBefore");
  }
};

const sendEmailToExpired = async () => {
  try {
    const users = await userService.getAllUsers();

    if (users) {
      for (const user of users) {
        sendEmailToUser(user as any);
      }
    }
  } catch (error) {
    console.error('Error sending email to expired users:', error);
  }
};

export const checkAndNotifyExpiry = async () => {
  try {
    await dataCollectService.updateProductsExpiryDays();
    sendEmailToExpired();
  } catch (error) {
    console.error('Error during expiration check and notification:', error);
  }
};
