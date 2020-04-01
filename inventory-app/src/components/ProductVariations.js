import React from "react";

class ProductVariations extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddVariation = this.handleAddVariation.bind(this);
    this.handleRemoveVariation = this.handleRemoveVariation.bind(this);
    this.handleResetVariation = this.handleResetVariation.bind(this);
    this.state = { variations: this.props.variations, loading: false };
  }

  handleAddVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity++;
    this.props.change(variation);
    this.setState({ loading: true });
  }
  handleRemoveVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity--;
    this.props.change(variation);
    this.setState({ loading: true });
  }
  handleResetVariation(variationId) {
    let variation = this.state.variations.find(
      variation => variation.id === variationId
    );
    variation.stock_quantity = 0;
    this.props.change(variation);
    this.setState({ loading: true });
  }
  mapVariation = variation => {
    let variationSize = variation.attributes.find(attr => attr.name === "size")
      ?.option;
    let variationExDate = variation.attributes.find(
      attr => attr.name === "exdate"
    )?.option;

    return (
      <div key={variation.id} style={{ marginTop: 40 }}>
        <div
          className="header"
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
            fontSize: 17,
            fontWeight: 600
          }}
        >
          <span style={{ margin: 8 }}>{this.props.name}</span>
          <span style={{ margin: 8, textAlign: "center" }}>
            {variationSize}
          </span>
          <span style={{ margin: 8 }}>{variationExDate}</span>
          <span style={{ margin: 8, textAlign: "center" }}>
            {"ILOŚĆ: " + variation.stock_quantity}
          </span>
        </div>
        <div
          className="extra content"
          style={{
            display: "grid"
          }}
        >
          <button
            className="ui primary button"
            onClick={() => this.handleAddVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 8 }}
          >
            Dodaj
          </button>
          <button
            className="ui primary  button"
            onClick={() => this.handleRemoveVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 8 }}
          >
            Usuń
          </button>
          <button
            className="ui primary button"
            onClick={() => this.handleResetVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 8 }}
          >
            Zeruj
          </button>
        </div>
      </div>
    );
  };

  render() {
    // console.log("propsy variations: ", this.props.variations);
    if (this.state.variations) {
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
