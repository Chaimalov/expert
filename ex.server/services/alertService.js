import { getProductsByUser, addDaysToDate } from "./productsService";
import { getAllUsers } from "./userService";
import { sendEmail } from "../sendMassage";

let allUsers = getAllUsers();

const getExpiredProducts = (userId, notifyBefore) => {
  const expiredProducts = getProductsByUser(userId).filter((product) => {
    return product.expiryDate <= addDaysToDate(new Date(), -notifyBefore);
  });
  return expiredProducts;
};

const sendEmailToUser = (user) => {
  const products = getExpiredProducts(user, user.notifyBefore);
  let subject = `your products are getting expired!`;
  let message = `products: ${products}`;

  sendEmail(user.email, subject, message);
};

const sendEmailToExpired = () => {
  allUsers.forEach((user) => {
    sendEmailToUser(user);
  });
};

export default {
  sendEmailToExpired,
};
