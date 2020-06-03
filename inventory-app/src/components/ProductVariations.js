import React from "react";
import ModalEditVariation from "./ModalEditVariation";
import VegevekService from "../vegevekService";
import { Button, Modal } from "semantic-ui-react";

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
      variationRedirects: [],
      activeRedirects: [],
      open: false,
      alreadyExisting: false,
      existingRedirectVariation: null,
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
    marginLeft: 20,
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
    marginLeft: 10,
    // textAlign: "center",
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

  open = () => this.setState({ open: true, alreadyExisting: false });
  close = () => this.setState({ open: false, alreadyExisting: false });

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
    const product = this.props.product;
    let productModified = false;

    for (let varAttr of changedVariation.attributes) {
      let attribute = product.attributes.find((a) => a.id === varAttr.id);
      if (attribute === undefined) {
        product.attributes.push({
          id: varAttr.id,
          options: [varAttr.option],
          variation: true,
        });
        productModified = true;
      } else {
        if (!attribute.variation) {
          attribute.variation = true;
          productModified = true;
        }

        let selectedOption = attribute.options.find(
          (o) => o === varAttr.option
        );
        if (selectedOption === undefined) {
          attribute.options.push(varAttr.option);
          productModified = true;
        }
      }
    }

    if (productModified) {
      VegevekService.updateProductAttributes({
        id: product.id,
        attributes: product.attributes,
        type: product.type,
      }).then((product) => {
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
      });
    } else {
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
    }
  };

  handleVariationRedirectChange = (e, variationId) => {
    let elementIndex = this.state.variationRedirects.findIndex(
      (vr) => vr.variationId === variationId
    );

    if (elementIndex !== -1) {
      let vr = this.state.variationRedirects[elementIndex];
      vr.redirect.url = e.target.value;
      this.setState((prev) => {
        const vrs = [...prev.variationRedirects];
        vrs[elementIndex] = vr;
        return { variationRedirects: vrs };
      });
    } else {
      let vr = {
        variationId: variationId,
        redirect: {
          url: e.target.value,
        },
      };
      this.setState((prev) => {
        const vrs = [...prev.variationRedirects];
        vrs.push(vr);
        return { variationRedirects: vrs };
      });
    }
  };

  handleRedirectSave = (e, variationId) => {
    e.preventDefault();

    let elementIndex = this.state.variationRedirects.findIndex(
      (vr) => vr.variationId === variationId
    );

    if (elementIndex >= 0) {
      let vr = this.state.variationRedirects[elementIndex];

      // let alreadyExisting = this.state.activeRedirects.find(
      //   (ar) => ar.id !== vr.redirect.id && ar.url === vr.redirect.url
      // );

      let alreadyExisting = this.state.variationRedirects.find(
        (v) =>
          v.variationId !== vr.variationId && v.redirect.url === vr.redirect.url
      );

      if (alreadyExisting) {
        this.setState({
          alreadyExisting: true,
          existingRedirectVariation: alreadyExisting,
        });
      }

      if (typeof alreadyExisting === "undefined") {
        if (vr.redirect.id) {
          this.editData(vr).then(() => this.fetchRedirect());
        } else {
          this.postData(vr).then(() => this.fetchRedirect());
        }
      }
    } else {
      console.log("Error: redirect not created, variation Id: ", variationId);
    }
  };

  redirect = (variationId, variation) => {
    if (this.state.variationRedirects) {
      let variationRedirect = this.state.variationRedirects.find(
        (vr) => vr.variationId === variationId
      );

      if (variationRedirect != null && variationRedirect.redirect.id != null) {
        return (
          <>
            <form onSubmit={(e) => this.handleRedirectSave(e, variationId)}>
              <input
                value={variationRedirect.redirect.url}
                onChange={(e) =>
                  this.handleVariationRedirectChange(e, variationId)
                }
                style={{ maxWidth: "35%" }}
              />
              <input type="submit" value="update" onClick={this.open} />

              {this.state.alreadyExisting ? (
                <Modal open={this.state.open} onClose={this.close}>
                  <Modal.Content>
                    <h3>
                      This redirection already exists{" "}
                      {this.state.existingRedirectVariation.variationId} for: in
                      category:
                    </h3>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="green" onClick={this.close}>
                      OK
                    </Button>
                  </Modal.Actions>
                </Modal>
              ) : null}
            </form>
          </>
        );
      } else {
        return (
          <form onSubmit={(e) => this.handleRedirectSave(e, variationId)}>
            <input
              placeholder="enter qr `ex. /?234`"
              onChange={(e) =>
                this.handleVariationRedirectChange(e, variationId)
              }
              style={{ maxWidth: "35%" }}
            />

            <input type="submit" value="create" onClick={this.open} />

            {this.state.alreadyExisting ? (
              <Modal open={this.state.open} onClose={this.close}>
                <Modal.Content>
                  <h3>
                    This redirection already exists{" "}
                    {this.state.existingRedirectVariation.variationId} for: in
                    category:
                  </h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={this.close}>
                    OK
                  </Button>
                </Modal.Actions>
              </Modal>
            ) : null}
          </form>
        );
      }
    }
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

          {this.redirect(variation.id, variation)}

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

  fetchRedirect = () => {
    const username = "asia";
    const password = "ECXo IRKT VONb q3Es T4vy 1wtS";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const url = "http://localhost/wordpress/wp-json/redirection/v1/redirect";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.items);
        let variationRedirects = [];
        for (let redirect of responseData.items) {
          let matchingVariation = this.state.variations.find(
            (variation) =>
              redirect.action_data.url ===
              `http://localhost/wordpress/?add-to-cart=${variation.id}`
          );
          // console.log("matchingVariation", matchingVariation);
          if (matchingVariation)
            variationRedirects.push({
              variationId: matchingVariation.id,
              redirect: redirect,
            });
        }

        this.setState({
          variationRedirects: variationRedirects,
          activeRedirects: responseData.items,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  async postData(variationRedirect) {
    let url = "http://localhost/wordpress/wp-json/redirection/v1/redirect";
    let data = {
      url: variationRedirect.redirect.url,
      match_url: "/",
      match_data: {
        source: {
          flag_query: "exact",
          flag_case: false,
          flag_trailing: false,
          flag_regex: false,
        },
      },
      action_code: 301,
      action_type: "url",
      action_data: {
        url: `http://localhost/wordpress/?add-to-cart=${variationRedirect.variationId}`,
      },
      match_type: "url",
      group_id: 3,
    };

    const username = "asia";
    const password = "ECXo IRKT VONb q3Es T4vy 1wtS";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(data);
  }

  async editData(variationRedirect) {
    let url = `http://localhost/wordpress/wp-json/redirection/v1/redirect/${variationRedirect.redirect.id}`,
      data = {
        url: variationRedirect.redirect.url,
        match_url: "/",
        match_data: {
          source: {
            flag_query: "exact",
            flag_case: false,
            flag_trailing: false,
            flag_regex: false,
          },
        },
        action_code: 301,
        action_type: "url",
        action_data: {
          url: `http://localhost/wordpress/?add-to-cart=${variationRedirect.variationId}`,
        },
        match_type: "url",
        group_id: 3,
      };

    const username = "asia";
    const password = "ECXo IRKT VONb q3Es T4vy 1wtS";
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(data);
  }

  componentDidMount() {
    this.handleCurrencyFetch();
    this.fetchRedirect();
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
