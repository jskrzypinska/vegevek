import React from "react";

import Product from "./Product";

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    // this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  // handleQuantityChange(product) {
  //   console.log("Zmieniono produkt: ", product);
  //   this.props.onProductChange(product);
  // }

  productToProductItem = product => {
    return (
      <Product product={product} />
      // onQuantityChange={this.handleQuantityChange}
    );
  };
  render() {
    return <>{this.props.products.map(this.productToProductItem)}</>;
  }
}
