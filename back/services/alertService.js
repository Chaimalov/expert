import { getProductsByUser, addDaysToDate } from "./productsService";
import { getAllUsers } from "./userService";
import { sendEmail } from "../sendMassage";

const getExpiredProducts = (userId, notifyBefore) => {
  const expiredProducts = getProductsByUser(userId).filter((product) => {
    return product.expiryDate <= addDaysToDate(new Date(), -notifyBefore);
  });
  return expiredProducts;
};
const sendEmailToUser = (user) => {
  sendEmail(user.email, "", "");
};
