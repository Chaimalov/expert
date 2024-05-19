import dataCollectRepository from "../repositories/dataCollectRepository.js";
import productsService from "./productsService.js";
import { Product } from "../types/product.js";
import { avgArrayOfNumbers } from "../utils.js";
const updateProductsExpiryDays = async () => {
  const products: Product[] = await productsService.getProducts();

  products.forEach(async (product) => {
    const daysArray = await collectExpiryDaysOnProduct(product.id);

    if (daysArray.length) {
      daysArray.push(parseInt(product.expiryDays));

      const avgDays = avgArrayOfNumbers(daysArray);

      productsService.updateProductsExpiryDays(product.id, avgDays);
    }
  });
};

const collectExpiryDaysOnProduct = async (productId: string) => {
  const productGroup: { products: Product[] }[] = await dataCollectRepository
    .collectUsersWithProduct(productId)
    .then((docs) => docs.map((doc) => ({ products: doc.get("products") })));

  return productGroup
    .map((doc) =>
      Object.values(doc.products).map((product) => parseInt(product.expiryDays))
    )
    .flat();
};

export default {
  updateProductsExpiryDays,
};
