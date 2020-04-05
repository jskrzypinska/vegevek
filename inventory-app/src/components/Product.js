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
        return { product: product, loading: true };
      },
      () => this.props.onQuantityChange(this.state.product)
    );
  }

  handleRemove(e) {
    this.setState(
      prevState => {
        let product = { ...prevState.product };
        product.stock_quantity--;
        return { product: product, loading: true };
      },

      () => this.props.onQuantityChange(this.state.product)
    );
  }
  handleReset() {
    this.setState(
      prevState => {
        let product = { ...prevState.product };
        product.stock_quantity = 0;
        return { product: product, loading: true };
      },
      () => this.props.onQuantityChange(this.state.product)
    );
  }

  handleVariationChange(variation) {
    this.props.onVariationChange(this.state.product.id, variation);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({ product: this.props.product, loading: false });
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
              justifyContent: "space-around"
            }}
          >
            <div style={{ placeSelf: "center" }}>{this.state.product.name}</div>
            <div class="ui red small statistic">
              <div className="value">{this.state.product.stock_quantity}</div>
              <div classNAme="label">szt.</div>
            </div>
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
              disabled={this.state.loading}
            >
              <i class="fas fa-plus"></i>
            </button>
            <button
              style={{ margin: 18 }}
              className="big ui basic red button"
              onClick={this.handleRemove}
              disabled={this.state.loading}
            >
              {this.state.loading} <i class="fas fa-minus"></i>
            </button>
            <button
              style={{ margin: 18 }}
              className="big ui black basic button"
              onClick={this.handleReset}
              disabled={this.state.loading}
            >
              0
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
