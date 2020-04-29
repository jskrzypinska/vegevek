import React from "react";

import Product from "./Product";

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleVariationsChange = this.handleVariationsChange.bind(this);
  }

  handleQuantityChange(product) {
    this.props.onProductChange(product);
  }
  handleVariationsChange(productId, variation) {
    this.props.onVariationChange(productId, variation);
  }
  handleAddProductVariation = (
    productId,
    variationAttributes,
    regularPrice,
    salePrice,
    quantity
  ) => {
    this.props.onAddedProductVariation(
      productId,
      variationAttributes,
      regularPrice,
      salePrice,
      quantity
    );
  };

  productToProductItem = (product) => {
    return (
      <Product
        key={product.id}
        product={product}
        onQuantityChange={this.handleQuantityChange}
        onVariationChange={this.handleVariationsChange}
        onAddedProductVariation={this.handleAddProductVariation}
      />
    );
  };
  render() {
    return <>{this.props.products.map(this.productToProductItem)}</>;
  }
}
