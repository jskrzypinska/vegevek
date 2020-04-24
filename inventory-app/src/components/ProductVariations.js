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
  ui_label = {
    fontSize: "1.1rem",
    margin: 5,
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
  };
  content_header = {
    display: "flex",
    justifyContent: "space-around",

    marginBottom: 40,
    fontSize: "large",
    fontWeight: 500,
    flex: "2 0 0",
  };
  header = {
    placeSelf: "center",
    maxWidth: "50%",
    textAlign: "center",
    flex: 1,
    marginTop: 10,
  };
  content_buttons = {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  };
  handleAddVariation(variationId) {
    let variation = this.state.variations.find(
      (variation) => variation.id === variationId
    );
    variation.stock_quantity++;
    this.props.change(variation);
    this.setState({ loading: true });
  }

  handleRemoveVariation(variationId) {
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
      <div className={"ui label"} style={this.ui_label} key={attribute.id}>
        {attribute.name.toUpperCase()} : {attribute.option}
      </div>
    );
  };

  mapVariation = (variation) => {
    return (
      <div key={variation.id} className="ui card">
        <div className="content">
          <div className="extra content" style={this.content_header}>
            <div style={this.header}>
              {this.props.name}: {variation.id}
            </div>
            <div className="ui red small statistic" style={{ marginTop: 25 }}>
              <div className="value">{variation.stock_quantity}</div>
              <div className="label">Qty</div>
            </div>
          </div>

          <div
            className="extra content"
            style={{
              display: "flex",
            }}
          >
            {variation.attributes.map(this.mapAttribute)}
          </div>

          <div className="extra content" style={this.content_buttons}>
            <button
              className="big ui circular basic positive button"
              onClick={() => this.handleAddVariation(variation.id)}
              disabled={this.state.loading}
              style={{ margin: 18 }}
            >
              <i className="fas fa-plus"></i>
            </button>
            <button
              className="big ui circular basic red button"
              onClick={() => this.handleRemoveVariation(variation.id)}
              disabled={this.state.loading}
              style={{ margin: 18 }}
            >
              <i className="fas fa-minus"></i>
            </button>
            <button
              className="big ui circular basic black  button"
              onClick={() => this.handleResetVariation(variation.id)}
              disabled={this.state.loading}
              style={{ margin: 18 }}
            >
              0
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    // console.log(this.props.variations);
    if (this.state.variations) {
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
