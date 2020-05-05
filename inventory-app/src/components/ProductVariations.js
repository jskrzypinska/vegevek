import React from "react";
import ModalEditVariation from "./ModalEditVariation";
import VegevekService from "../vegevekService";

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
    };
  }

  ui_label = {
    fontSize: "1rem",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
  };

  handleAddVariation(variationId) {
    this.setState({ loading: true }, () => {
      let variation = this.state.variations.find(
        (variation) => variation.id === variationId
      );
      variation.stock_quantity++;
      VegevekService.updateProductVariation(
        this.props.productId,
        variation
      ).then((updatedVariation) => {
        let elementIndex = this.state.variations.findIndex(
          (v) => v.id === updatedVariation.id
        );

        if (elementIndex !== -1) {
          this.setState((prev) => {
            const variations = [...prev.variations];
            variations[elementIndex] = updatedVariation;
            return { variations: variations, loading: false };
          });
        } else {
          alert(
            "Błąd: nie znalezion modyfikowanej wariacji, id: " + variation.id
          );
        }
      });
    });
  }

  handleRemoveVariation(variationId) {
    this.setState({ loading: true }, () => {
      let variation = this.state.variations.find(
        (variation) => variation.id === variationId
      );
      variation.stock_quantity--;
      VegevekService.updateProductVariation(
        this.props.productId,
        variation
      ).then((updatedVariation) => {
        let elementIndex = this.state.variations.findIndex(
          (v) => v.id === updatedVariation.id
        );

        if (elementIndex !== -1) {
          this.setState((prev) => {
            const variations = [...prev.variations];
            variations[elementIndex] = updatedVariation;
            return { variations: variations, loading: false };
          });
        } else {
          alert(
            "Błąd: nie znalezion modyfikowanej wariacji, id: " + variation.id
          );
        }
      });
    });
  }
  handleResetVariation(variationId) {
    this.setState({ loading: true }, () => {
      let variation = this.state.variations.find(
        (variation) => variation.id === variationId
      );
      variation.stock_quantity = 0;
      VegevekService.updateProductVariation(
        this.props.productId,
        variation
      ).then((updatedVariation) => {
        let elementIndex = this.state.variations.findIndex(
          (v) => v.id === updatedVariation.id
        );

        if (elementIndex !== -1) {
          this.setState((prev) => {
            const variations = [...prev.variations];
            variations[elementIndex] = updatedVariation;
            return { variations: variations, loading: false };
          });
        } else {
          alert(
            "Błąd: nie znalezion modyfikowanej wariacji, id: " + variation.id
          );
        }
      });
    });
  }

  handleVariationChange = (changedVariation) => {
    VegevekService.updateProductVariation(
      this.props.productId,
      changedVariation
    ).then((variation) => {
      let elementIndex = this.state.variations.findIndex(
        (v) => v.id === variation.id
      );
      if (elementIndex !== -1) {
        this.setState((prev) => {
          const variations = [...prev.variations];
          variations[elementIndex] = variation;
          return { variations: variations };
        });
      } else {
        alert(
          "Błąd: nie znalezion modyfikowanej wariacji, id: " + variation.id
        );
      }
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
      <div key={variation.id} className="ui card" style={{ width: "100%" }}>
        <ModalEditVariation
          variation={variation}
          attributes={this.state.attributes}
          change={this.handleVariationChange}
          name={this.props.name}
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
                textAlign: "center",
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
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
