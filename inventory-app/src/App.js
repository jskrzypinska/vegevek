import React from "react";

import VegevekService from "./vegevekService";
import { ProductList } from "./components/ProductList";

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.vegewekService = new VegewekService();
    this.handleDataFetch = this.handleDataFetch.bind(this);
    // this.handleProductChange = this.handleProductChange.bind(this);
    // this.updateProduct = this.updateProduct.bind(this);
    this.state = {
      products: [],
      isLoaded: false
    };
  }

  handleDataFetch() {
    VegevekService.getProducts(30, 5).then(products => {
      console.log("ściągnięto produkty: ", products);
      this.setState({ products, isLoaded: true });
    });
  }

  // handleProductChange(product) {
  //   console.log("handleProductChange", product);
  //   this.updateProduct(product);
  // }

  // updateProduct(product) {
  //   api
  //     .put("products/" + product.id, {
  //       stock_quantity: product.stock_quantity
  //     })
  //     .then(response => {
  //       this.handleDataFetch();
  //     })
  //     .catch(error => {
  //       // Invalid request, for 4xx and 5xx statuses
  //       console.log("Response Status:", error.response.status);
  //     });
  // }

  componentDidMount() {
    this.handleDataFetch();
  }

  render() {
    return (
      <div className="ui container">
        <ul>
          {this.state.isLoaded ? (
            <ProductList
              products={this.state.products}
              // onProductChange={this.handleProductChange}
            />
          ) : (
            "Ładowanie"
          )}
        </ul>
      </div>
    );
  }
}

export default App;
