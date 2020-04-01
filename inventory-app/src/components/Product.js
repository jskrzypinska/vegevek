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
    if (prevProps.product !== this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 10
            }}
          >
            <span>{this.state.product.name}</span>

            <span>{"ILOŚĆ: " + this.state.product.stock_quantity}</span>
          </div>

          <div
            className="extra content"
            style={{
              margin: 10,
              display: "grid"
            }}
          >
            <button
              style={{ margin: 8 }}
              className="ui primary basic button"
              onClick={this.handleAdd}
            >
              Dodaj
            </button>
            <button
              style={{ margin: 8 }}
              className="ui brown basic button"
              onClick={this.handleRemove}
            >
              Usuń
            </button>
            <button
              style={{ margin: 8 }}
              className="ui black basic button"
              onClick={this.handleReset}
            >
              Zeruj
            </button>
          </div>

          {this.state.product.product_variations ? (
            <ProductVariations
              variations={this.state.product.product_variations}
              name={this.state.product.name}
              change={this.handleVariationChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Product;
