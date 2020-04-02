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
      <div key={variation.id}>
        <hr style={{ width: "100%" }} />
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: 25,
            fontSize: "large",
            fontWeight: 500
          }}
        >
          <span style={{ margin: 8 }}>{this.props.name}</span>
          <span style={{ margin: 8, textAlign: "center" }}>
            {"SZT : " + variation.stock_quantity}
          </span>
        </div>
        <div
          className="extra content"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 15,
            fontSize: "initial",
            fontWeight: 500
          }}
        >
          <span style={{ margin: 8, textAlign: "center" }}>
            {variationSize}
          </span>
          <span style={{ margin: 8 }}>{"DATA : " + variationExDate}</span>
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
            className="big ui basic positive button"
            onClick={() => this.handleAddVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            <i class="fas fa-plus"></i>
          </button>
          <button
            className="big ui basic red button"
            onClick={() => this.handleRemoveVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            <i class="fas fa-minus"></i>
          </button>
          <button
            className="big ui black basic button"
            onClick={() => this.handleResetVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            Zeruj
          </button>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.variations) {
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
