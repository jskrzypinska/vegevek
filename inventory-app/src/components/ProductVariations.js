import React from "react";

class ProductVariations extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddVariation = this.handleAddVariation.bind(this);
    this.handleRemoveVariation = this.handleRemoveVariation.bind(this);
    this.handleResetVariation = this.handleResetVariation.bind(this);
    this.state = { variations: this.props.variations };
  }

  handleAddVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity++;
    this.props.change(variation);
  }
  handleRemoveVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity--;
    this.props.change(variation);
  }
  handleResetVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity = 0;
    this.props.change(variation);
  }
  mapVariation = variation => {
    return (
      <li>
        {this.props.name}
        <br />
        {variation.attributes[0].option}
        <br />
        {"ILOSC: " + variation.stock_quantity}
        <br />
        <button onClick={() => this.handleAddVariation(variation.id)}>
          add variations
        </button>
        <button onClick={() => this.handleRemoveVariation(variation.id)}>
          remove variations
        </button>
        <button onClick={() => this.handleResetVariation(variation.id)}>
          reset variations
        </button>
      </li>
    );
  };

  render() {
    console.log("propsy variations: ", this.props.variations);
    if (this.state.variations) {
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
