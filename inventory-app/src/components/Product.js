import React from "react";
import ProductVariations from "./ProductVariations";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleVariationChange = this.handleVariationChange.bind(this);
    this.state = { product: this.props.product };
  }

  handleAdd(e) {
    //product.amountInStock
    this.setState(
      prevState => {
        let product = { ...prevState.product };
        product.stock_quantity++;
        return { product: product };
      },
      () => this.props.onQuantityChange(this.state.product)
    );
  }

  handleRemove(e) {
    //product.amountInStock
    this.setState(
      prevState => {
        let product = { ...prevState.product };
        product.stock_quantity--;
        return { product: product };
      },
      () => this.props.onQuantityChange(this.state.product)
    );
  }
  handleReset() {
    this.setState(
      prevState => {
        let product = { ...prevState.product };
        product.stock_quantity = 0;
        return { product: product };
      },
      () => this.props.onQuantityChange(this.state.product)
    );
  }

  handleVariationChange(variation) {
    this.props.onVariationChange(this.state.product.id, variation);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product != this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    console.log("PRODUCT RENDER, STATE:", this.state);
    console.log("PRODUCT RENDER, PROPS:", this.props);
    return (
      <li key={this.state.product.id}>
        {this.state.product.name}
        <br />
        {"ILOSC: " + this.state.product.stock_quantity}
        <br />
        <button onClick={this.handleAdd}> add </button>
        <button onClick={this.handleRemove}> remove </button>
        <button onClick={this.handleReset}> reset </button>
        {this.state.product.product_variations ? (
          <ProductVariations
            variations={this.state.product.product_variations}
            name={this.state.product.name}
            change={this.handleVariationChange}
          />
        ) : null}
      </li>
    );
  }
}

export default Product;
