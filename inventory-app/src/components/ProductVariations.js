import React from "react";

class ProductVariations extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddVariation = this.handleAddVariation.bind(this);
    this.handleRemoveVariation = this.handleRemoveVariation.bind(this);
    this.handleResetVariation = this.handleResetVariation.bind(this);
    this.state = {
      variations: this.props.variations,
      loading: false,
    };
  }

  handleAddVariation(variationId) {
    let variation = this.state.variations.find(
      (variation) => variation.id === variationId
    );
    variation.stock_quantity++;
    this.props.change(variation);
    this.setState({ loading: true });
  }

  handleRemoveVariation(variationId) {
    console.log(this.state.variations);
    let variation = this.state.variations.find(
      (variation) => variation.id === variationId
    );
    variation.stock_quantity--;
    this.props.change(variation);
    this.setState({ loading: true });
  }
  handleResetVariation(variationId) {
    let variation = this.state.variations.find(
      (variation) => variation.id === variationId
    );
    variation.stock_quantity = 0;
    this.props.change(variation);
    this.setState({ loading: true });
  }

  mapAttribute = (attribute) => {
    return (
      <div
        className={attribute.name === "exdate" ? "ui blue label" : "ui label"}
        style={{
          fontSize: "1.1rem",
          margin: 5,
          textAlign: "center",
          justifyContent: "center",
          flex: 1,
        }}
        key={attribute.id}
      >
        {attribute.name.toUpperCase()} : {attribute.option}
      </div>
    );
  };

  mapVariation = (variation) => {
    return (
      <div key={variation.id}>
        <hr style={{ width: "100%" }} />
        <div
          className="extra content"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 30,
            marginBottom: 45,
            fontSize: "large",
            fontWeight: 500,
            flex: "2 0 0",
          }}
        >
          <div
            style={{
              placeSelf: "center",
              maxWidth: "50%",
              textAlign: "center",
              flex: 1,
            }}
          >
            {this.props.name}
          </div>
          <div className="ui red small statistic" style={{ margin: 0 }}>
            <div className="value">{variation.stock_quantity}</div>
            <div className="label">Qty</div>
          </div>
        </div>

        <div
          className="extra content"
          style={{
            // flexDirection: "column",
            display: "flex",
          }}
        >
          {variation.attributes.map(this.mapAttribute)}
        </div>

        <div
          className="extra content"
          style={{
            margin: 15,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            className="big ui circular  positive button"
            onClick={() => this.handleAddVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            <i className="fas fa-plus"></i>
          </button>
          <button
            className="big ui circular  red button"
            onClick={() => this.handleRemoveVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            className="big ui circular black  button"
            onClick={() => this.handleResetVariation(variation.id)}
            disabled={this.state.loading}
            style={{ margin: 18 }}
          >
            0
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
