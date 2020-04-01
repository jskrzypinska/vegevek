import React from "react";

import Product from "./Product";

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleVariationsChange = this.handleVariationsChange.bind(this);
  }

  handleQuantityChange(product) {
    // console.log("Zmieniono produkt: ", product);
    this.props.onProductChange(product);
  }
  handleVariationsChange(productId, variation) {
    this.props.onVariationChange(productId, variation);
  }

  productToProductItem = product => {
    return (
      <Product
        key={product.id}
        product={product}
        onQuantityChange={this.handleQuantityChange}
        onVariationChange={this.handleVariationsChange}
      />
    );
  };
  render() {
    return <>{this.props.products.map(this.productToProductItem)}</>;
  }
}

//
