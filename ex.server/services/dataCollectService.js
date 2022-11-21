import dataCollectRepository from "../repositories/dataCollectRepository.js";
import productsService from "./productsService.js";

const updateProductsExpiryDays = async () => {
  const products = await productsService.getProducts();

  products.forEach(async (product) => {
    const daysArray = await collectExpiryDaysOnProduct(product.id);

    if (daysArray.length) {
      daysArray.push(parseInt(product.expiryDays));

      const avgDays = parseInt(
        daysArray.reduce((sum, days) => sum + days, 0) / daysArray.length
      );

      productsService.updateProductsExpiryDays(product.id, avgDays);
    }
  });
};

const collectExpiryDaysOnProduct = async (productId) => {
  const productGroup = await dataCollectRepository.collectUsersWithProduct(
    productId
  );

  return productGroup
    .filter((doc) => doc.products)
    .map((doc) =>
      Object.values(doc.products).map((product) => parseInt(product.expiryDays))
    )
    .flat();
};

export default {
  updateProductsExpiryDays,
};
