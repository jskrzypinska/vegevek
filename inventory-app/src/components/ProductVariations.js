import React from "react";

class ProductVariations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <li>ProductVariations</li>;
  }
}

export default ProductVariations;
