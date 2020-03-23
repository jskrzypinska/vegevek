import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { cK } from "./WooApi";
import { cS } from "./WooApi";

const api = new WooCommerceRestApi({
  url: "https://vegevek.pl",
  consumerKey: `${cK}`,
  consumerSecret: `${cS}`,
  version: "wc/v3",
  queryStringAuth: true
});

class VegevekService {
  constructor() {}

  static async getProducts(productCategory, pageSize) {
    return api
      .get("products", {
        per_page: pageSize, // 100 products per page
        category: productCategory // Lokalizacje/Scalac
      })
      .then(response => {
        console.log("getProducts: sukces");
        const products = response.data;
        return products;
      })
      .catch(error => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("get products: błąd", error);
      });
  }

  static async getProductById(productId) {
    return api
      .get("products/" + productId)
      .then(response => {
        console.log("getProductById: sukces");
        const product = response.data;
        return product;
      })
      .catch(error => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("getProductById: błąd", error);
      });
  }

  static async getProductVariations(productId) {
    return api
      .get(`products/${productId}/variations`)
      .then(response => {
        console.log("getProductVariations: sukces");
        const product = response.data;
        return product;
      })
      .catch(error => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("getProductVariations: błąd", error);
      });
  }
}

export default VegevekService;
