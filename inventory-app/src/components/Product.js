import React from "react";
import ProductVariations from "./ProductVariations";

class Product extends React.Component {
  constructor(props) {
    super(props);
    // this.handleAdd = this.handleAdd.bind(this);
    //this.handleSingleProductFetch = this.handleSingleProductFetch.bind(this);
    this.state = { product: this.props.product };
  }

  // handleSingleProductFetch(productId) {
  //   api
  //     .get("products", {
  //       productId: productId
  //     })
  //     .then(response => {
  //       const product = response.data;
  //       console.log(product + " pobrano produkt ");
  //       this.setState({ product: product });
  //     })
  //     .catch(error => {
  //       // Invalid request, for 4xx and 5xx statuses
  //       console.log("Response Status:", error.response.status);
  //     });
  // }

  // handleAdd(e) {y
  //   //product.amountInStock
  //   this.setState(
  //     prevState => {
  //       let product = { ...prevState.product };
  //       product.stock_quantity++;
  //       return { product: product };
  //     },
  //     () => this.props.onQuantityChange(this.state.product)
  //   );
  // }

  // render() {
  //   console.log(this.state.product.id + "productid");
  //   return (
  //     <tr key={this.state.product.id}>
  //
  //       <td>{this.state.product.stock_quantity}</td>
  //       <td>
  //         <button onClick={this.handleAdd}> add </button>
  //       </td>
  //     </tr>
  //   );
  // }

  onClick() {
    //handleSingleProductFetch(this.state.product.id);
    //console.log();
  }
  render() {
    return (
      <li
        onClick={() => console.log("wybrano produkt " + this.state.product.id)}
        key={this.state.product.id}
      >
        {this.state.product.name}
        <ProductVariations />
      </li>
    );
  }
}

export default Product;
