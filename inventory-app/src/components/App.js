import React from "react";

import VegevekService from "../vegevekService";
import Category from "./Category";
import { ProductList } from "./ProductList";
import Modal from "./Modal";
import { Button } from "semantic-ui-react";
import Cookies from "js-cookie";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleDataFetch = this.handleDataFetch.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.handleProductVariationsChange = this.handleProductVariationsChange.bind(
      this
    );
    this.state = {
      products: [],
      productsLoaded: false,
      categoriesLoaded: false,
      categories: [],
      selectedCategoryId: "null",
      configSets: false,
      showVariantProducts: false,
    };
  }

  fetchCategories() {
    VegevekService.getCategory().then((categories) => {
      this.setState({ categories, categoriesLoaded: true });
    });
  }
  handleDataFetch(categoryId) {
    VegevekService.getProducts(categoryId, 10).then((products) => {
      this.setState({ products, productsLoaded: true });

      for (let product of products) {
        VegevekService.getProductVariations(product.id).then((variations) => {
          product.product_variations = variations;
          this.setState({ products, productsLoaded: true });
        });
      }
    });
  }

  handleProductChange(product) {
    VegevekService.updateProduct(product)
      .then((product) => {})
      .then((response) => {
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
      .then((variation) => {})
      .then((response) => {
        this.handleDataFetch(this.state.selectedCategoryId);
      });
  }

  reloadData() {
    const key = Cookies.get("key");
    const secret = Cookies.get("secret");
    const url = Cookies.get("url");

    if (key && secret && url) {
      VegevekService.InitApi(key, secret, url);
      this.fetchCategories();
      this.setState({ configSets: true });
    }
  }

  handleModalClose() {
    this.reloadData();
  }

  componentDidMount() {
    this.reloadData();
  }

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Modal
            trigger={
              <Button onClick={this.handleOpen} style={{ margin: 30 }}>
                <i className="fas fa-cog"></i>
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleModalClose}
            basic
            size="small"
          />
        </div>
        {this.state.categoriesLoaded ? (
          <Category
            categories={this.state.categories}
            onCategoryChange={this.handleCategoryChange}
          />
        ) : (
          <div
            className="ui active centered inline loader"
            style={{ marginTop: 100 }}
          ></div>
        )}
        {this.state.configSets ? null : (
          <h2 className="ui center aligned header" style={{ margin: 50 }}>
            Please config app
          </h2>
        )}
        <div className="ui doubling stackable one cards">
          {this.state.productsLoaded ? (
            <ProductList
              products={this.state.products}
              onProductChange={this.handleProductChange}
              onVariationChange={this.handleProductVariationsChange}
            />
          ) : // <div class="ui active centered inline loader"></div>
          null}
        </div>
      </>
    );
  }
}

export default App;
