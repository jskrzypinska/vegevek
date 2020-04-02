import React from "react";

import VegevekService from "./vegevekService";
import Category from "./components/Category";
import { ProductList } from "./components/ProductList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleDataFetch = this.handleDataFetch.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleProductVariationsChange = this.handleProductVariationsChange.bind(
      this
    );
    this.state = {
      products: [],
      productsLoaded: false,
      categoriesLoaded: false,
      categories: [],
      selectedCategoryId: null
    };
  }

  fetchCategories() {
    VegevekService.getCategory().then(categories => {
      this.setState({ categories, categoriesLoaded: true });
    });
  }
  handleDataFetch(categoryId) {
    VegevekService.getProducts(categoryId, 5).then(products => {
      this.setState({ products, isLoaded: true });

      for (let product of products) {
        VegevekService.getProductVariations(product.id).then(variations => {
          product.product_variations = variations;
          this.setState({ products, productsLoaded: true });
        });
      }
    });
  }

  handleProductChange(product) {
    VegevekService.updateProduct(product)
      .then(product => {})
      .then(response => {
        this.handleDataFetch(this.state.selectedCategoryId);
      });
  }

  handleCategoryChange(categoryId) {
    this.setState({ selectedCategoryId: categoryId }, () =>
      this.handleDataFetch(this.state.selectedCategoryId)
    );
  }

  handleProductVariationsChange(productId, variation) {
    VegevekService.updateProductVariation(productId, variation)
      .then(variation => {})
      .then(response => {
        this.handleDataFetch(this.state.selectedCategoryId);
      });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    return (
      <div className="ui fluid container">
        {this.state.categoriesLoaded ? (
          <Category
            categories={this.state.categories}
            onCategoryChange={this.handleCategoryChange}
          />
        ) : null}

        <div className="ui doubling stackable four cards">
          {this.state.productsLoaded ? (
            <ProductList
              products={this.state.products}
              onProductChange={this.handleProductChange}
              onVariationChange={this.handleProductVariationsChange}
            />
          ) : null
          // <div class="ui active loader"></div>
          }
        </div>
      </div>
    );
  }
}

export default App;
