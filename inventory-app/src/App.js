import React from "react";

import VegevekService from "./vegevekService";
import { ProductList } from "./components/ProductList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataFetch = this.handleDataFetch.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleProductVariationsChange = this.handleProductVariationsChange.bind(
      this
    );
    this.state = {
      products: [],
      isLoaded: false
    };
  }

  handleDataFetch() {
    VegevekService.getProducts(30, 5).then(products => {
      // console.log("ściągnięto produkty: ", products);
      this.setState({ products, isLoaded: true });

      for (let product of products) {
        VegevekService.getProductVariations(product.id).then(variations => {
          // console.log("ściągnięto variations ", variations);
          product.product_variations = variations;
          this.setState({ products, isLoaded: true });
        });
      }
    });
  }

  handleProductChange(product) {
    VegevekService.updateProduct(product)
      .then(product => {
        console.log("updateproduct udało się", product);
      })
      .then(response => {
        this.handleDataFetch();
      });
  }

  handleProductVariationsChange(productId, variation) {
    VegevekService.updateProductVariation(productId, variation)
      .then(variation => {
        console.log("upadateVariaton", variation);
      })
      .then(response => {
        this.handleDataFetch();
      });
  }

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
              onProductChange={this.handleProductChange}
              onVariationChange={this.handleProductVariationsChange}
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
