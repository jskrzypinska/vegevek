import React from "react";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
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

  render() {
    console.log(this.state.product + "setstate");
    return (
      <tr>
        <td>{this.state.product.name}</td>
        <td>{this.state.product.stock_quantity}</td>
        <td>
          <button onClick={this.handleAdd}> add </button>
        </td>
      </tr>
    );
  }
}

export default Product;
