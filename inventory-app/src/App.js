import React from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { ProductList } from "./components/ProductList";
import { cK } from "./WooApi";
import { cS } from "./WooApi";

const api = new WooCommerceRestApi({
  url: "https://vegevek.pl",
  consumerKey: `${cK}`,
  consumerSecret: `${cS}`,
  version: "wc/v3",
  queryStringAuth: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataFetch = this.handleDataFetch.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.state = {
      products: [],
      isLoaded: false
    };
  }

  handleDataFetch() {
    api
      .get("products", {
        per_page: 100, // 100 products per page
        category: 30 // Lokalizacje/Scalac
      })
      .then(response => {
        const products = response.data;
        console.log(products + "tablica produktow");
        this.setState({ products, isLoaded: true });
      })
      .catch(error => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
      });
  }

  handleProductChange(product) {
    console.log("handleProductChange", product);
    this.updateProduct(product);
  }

  updateProduct(product) {
    api
      .put("products/" + product.id, {
        stock_quantity: product.stock_quantity
      })
      .then(response => {
        this.handleDataFetch();
      })
      .catch(error => {
        // Invalid request, for 4xx and 5xx statuses
        console.log("Response Status:", error.response.status);
      });
  }

  componentDidMount() {
    this.handleDataFetch();
  }
  render() {
    return (
      <div className="ui container">
        <table className="ui celled table">
          <thead class="">
            <tr class="">
              <th class="">Produkty</th>
              <th class="">Ilosc</th>
              <th class="">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {this.state.isLoaded ? (
              <ProductList
                products={this.state.products}
                onProductChange={this.handleProductChange}
              />
            ) : (
              "Ładowanie"
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
