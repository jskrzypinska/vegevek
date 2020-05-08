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
      currentCurrency: "",
    };
  }

  ui_label = {
    fontSize: "1rem",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
  };
  p_variationId = {
    display: "inline-block",
    float: "right",
    marginRight: 14,
  };
  container_price = {
    display: "flex",
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 50,
  };
  p_currency = {
    fontSize: "smaller",
    marginTop: 5,
  };
  container_salePrice = {
    margin: 0,
    marginLeft: 10,
    flexGrow: 1,
  };
  container_name = {
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: 500,
    flexGrow: 3,
    marginRight: 10,
    marginLeft: 5,
    textAlign: "center",
  };
  container_attributes = {
    display: "flex",
    margin: 15,
  };
  container_stockQty = {
    display: "flex",
    marginTop: 30,
    marginBottom: 10,
  };
  p_qty = {
    marginTop: 10,
    fontSize: "smaller",
  };
  btn_actions = {
    margin: 5,
    height: 40,
    width: 70,
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
  handleCurrencyFetch() {
    VegevekService.getCurrentCurrency().then((currentCurrency) => {
      this.setState({ currentCurrency });
    });
  }

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
          currentCurrency={this.state.currentCurrency}
        />
        <div className="content" style={{ padding: 0 }}>
          <p style={this.p_variationId}>id: {variation.id}</p>

          <div style={this.container_price}>
            <div className="ui mini horizontal statistic" style={{ margin: 0 }}>
              <div
                className="value"
                style={{ textDecorationLine: "line-through" }}
              >
                {variation.regular_price}
              </div>
              {variation.regular_price > 0 ? (
                <p
                  style={this.p_currency}
                  dangerouslySetInnerHTML={{
                    __html: this.state.currentCurrency.symbol,
                  }}
                ></p>
              ) : null}
            </div>
            <div
              className="ui mini horizontal statistic"
              style={this.container_salePrice}
            >
              <div className="value">{variation.sale_price}</div>
              {variation.sale_price > 0 ? (
                <p
                  style={this.p_currency}
                  dangerouslySetInnerHTML={{
                    __html: this.state.currentCurrency.symbol,
                  }}
                ></p>
              ) : null}
            </div>
            <div style={this.container_name}>{this.props.name}</div>
          </div>

          <div className="extra content" style={this.container_attributes}>
            {variation.attributes.map(this.mapAttribute)}
          </div>

          <div style={this.container_stockQty}>
            <div
              className="ui small black horizontal statistic"
              style={{ margin: "auto" }}
            >
              <div className="value">{variation.stock_quantity}</div>

              <p style={this.p_qty}>Qty</p>
            </div>

            <div>
              <button
                className="large ui circular basic positive button"
                onClick={() => this.handleAddVariation(variation.id)}
                disabled={this.state.loading}
                style={this.btn_actions}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="large ui circular basic red button"
                onClick={() => this.handleRemoveVariation(variation.id)}
                disabled={this.state.loading}
                style={this.btn_actions}
              >
                <i className="fas fa-minus"></i>
              </button>
              <button
                className="large ui circular basic black  button"
                onClick={() => this.handleResetVariation(variation.id)}
                disabled={this.state.loading}
                style={this.btn_actions}
              >
                0
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.handleCurrencyFetch();
  }

  render() {
    if (this.state.variations.length > 0) {
      return <>{this.state.variations.map(this.mapVariation)}</>;
    } else {
      return null;
    }
  }
}

export default ProductVariations;
