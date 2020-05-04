import React from "react";
import { Button } from "semantic-ui-react";
import ModalEditVariation from "./ModalEditVariation";

class ProductVariations extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddVariation = this.handleAddVariation.bind(this);
    this.handleRemoveVariation = this.handleRemoveVariation.bind(this);
    this.handleResetVariation = this.handleResetVariation.bind(this);
    this.state = {
      variations: this.props.variations,
      attributes: this.props.attributes,
      loading: false,
      showVariations: true,
    };
  }

  ui_label = {
    fontSize: "1rem",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
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

  handleVariationChange = (variation) => {
    this.props.change(variation);
  };
  showVariations = () => {
    this.setState({
      showVariations: !this.state.showVariations,
    });
  };

  mapAttribute = (attribute) => {
    return (
      <div className={"ui label"} style={this.ui_label} key={attribute.id}>
        {attribute.name} : {attribute.option}
      </div>
    );
  };

  mapVariation = (variation) => {
    return (
      <div
        key={variation.id}
        className="ui card"
        id={this.state.showVariations ? "" : "card_variation"}
        style={{ marginBottom: "30px" }}
      >
        <ModalEditVariation
          variation={variation}
          attributes={this.state.attributes}
          change={this.handleVariationChange}
        />
        <div className="content" style={{ padding: 0 }}>
          <p
            style={{ display: "inline-block", float: "right", marginRight: 14 }}
          >
            id: {variation.id}
          </p>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 50,
            }}
          >
            <div className="ui mini horizontal statistic" style={{ margin: 0 }}>
              <div
                className="value"
                style={{ textDecorationLine: "line-through" }}
              >
                {variation.regular_price}
              </div>
              {variation.regular_price > 0 ? (
                <p style={{ fontSize: "smaller", marginTop: 5 }}>zł</p>
              ) : null}
            </div>
            <div
              className="ui mini horizontal statistic"
              style={{ margin: 0, marginLeft: 10, flexGrow: 1 }}
            >
              <div className="value">{variation.sale_price}</div>
              {variation.sale_price > 0 ? (
                <p style={{ fontSize: "smaller", marginTop: 5 }}>zł</p>
              ) : null}
            </div>
            <div
              style={{
                margin: 0,
                fontSize: "1.3rem",
                fontWeight: 500,
                flexGrow: 3,
                marginRight: 10,
                marginLeft: 5,
              }}
            >
              {this.props.name}
            </div>
          </div>

          <div
            className="extra content"
            style={{
              display: "flex",
              margin: 15,
            }}
          >
            {variation.attributes.map(this.mapAttribute)}
          </div>

          <div style={{ display: "flex", marginTop: 30, marginBottom: 10 }}>
            <div
              className="ui small black horizontal statistic"
              style={{ margin: "auto" }}
            >
              <div className="value">{variation.stock_quantity}</div>

              <p style={{ marginTop: 10, fontSize: "smaller" }}>Qty</p>
            </div>

            <div>
              <button
                className="large ui circular basic positive button"
                onClick={() => this.handleAddVariation(variation.id)}
                disabled={this.state.loading}
                style={{ margin: 10, height: 40, width: 70 }}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="large ui circular basic red button"
                onClick={() => this.handleRemoveVariation(variation.id)}
                disabled={this.state.loading}
                style={{ margin: 10, height: 40, width: 70 }}
              >
                <i className="fas fa-minus"></i>
              </button>
              <button
                className="large ui circular basic black  button"
                onClick={() => this.handleResetVariation(variation.id)}
                disabled={this.state.loading}
                style={{ margin: 10, height: 40, width: 70 }}
              >
                0
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.variations.length > 0) {
      return (
        <>
          <Button onClick={this.showVariations} color="teal">
            {this.state.showVariations ? "Hide Variations" : "Show Variations"}
          </Button>
          {this.state.variations.map(this.mapVariation)}
        </>
      );
    } else {
      return null;
    }
  }
}

export default ProductVariations;
