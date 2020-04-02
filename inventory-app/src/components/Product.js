import React from "react";
import ProductVariations from "./ProductVariations";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleVariationChange = this.handleVariationChange.bind(this);
    this.state = { product: this.props.product, loading: false };
  }

  handleAdd(e) {
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
              justifyContent: "space-around",
              margin: 20
            }}
          >
            <span>{this.state.product.name}</span>

            <span>{"SZT : " + this.state.product.stock_quantity}</span>
          </div>

          <div
            className="extra content"
            style={{
              margin: 15,
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <button
              style={{ margin: 18 }}
              className="big ui basic positive button"
              onClick={this.handleAdd}
            >
              <i class="fas fa-plus"></i>
            </button>
            <button
              style={{ margin: 18 }}
              className="big ui basic red button"
              onClick={this.handleRemove}
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              style={{ margin: 18 }}
              className="big ui black basic button"
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
