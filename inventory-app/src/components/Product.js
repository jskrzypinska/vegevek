import React from "react";
import ProductVariations from "./ProductVariations";
import Message from "./Message";
import { Button } from "semantic-ui-react";
import Cookies from "js-cookie";
import AddProductVariation from "./AddProductVariation";

const DONT_SHOW_ROOT_PRODUCT_POPUP = "DontShowRootProductPopup";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleVariationChange = this.handleVariationChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.shouldNotShowPopup = this.shouldNotShowPopup.bind(this);
    this.handleAddedProductVariation = this.handleAddedProductVariation.bind(
      this
    );
    this.state = {
      product: this.props.product,
      loading: false,
      showOnlyVariantsProduct: false,
      open: false,

      mode: "none", //none, reset, add, remove
    };
  }
  content_buttons = {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  };
  content_header = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 30,
    fontSize: "large",
    fontWeight: 500,
    flex: "2 0 0",
  };
  header = {
    placeSelf: "center",
    maxWidth: "50%",
    textAlign: "center",
    flex: 1,
  };

  handleAdd() {
    if (this.shouldNotShowPopup()) {
      this.setState(
        (prevState) => {
          let product = { ...prevState.product };
          product.stock_quantity++;
          return {
            product: product,
            loading: true,
          };
        },
        () => this.props.onQuantityChange(this.state.product)
      );
    } else {
      this.setState({
        open: true,
        mode: "add",
      });
    }
  }

  handleRemove() {
    if (this.shouldNotShowPopup()) {
      this.setState(
        (prevState) => {
          let product = { ...prevState.product };
          product.stock_quantity--;
          return {
            product: product,
            loading: true,
          };
        },
        () => this.props.onQuantityChange(this.state.product)
      );
    } else {
      this.setState({
        open: true,
        mode: "remove",
      });
    }
  }

  handleReset() {
    if (this.shouldNotShowPopup()) {
      this.setState(
        (prevState) => {
          let product = { ...prevState.product };
          product.stock_quantity = 0;
          return {
            product: product,
            loading: true,
          };
        },
        () => this.props.onQuantityChange(this.state.product)
      );
    } else {
      this.setState({
        open: true,
        mode: "reset",
      });
    }
  }

  handleVariationChange(variation) {
    this.props.onVariationChange(this.state.product.id, variation);
  }

  handleAddedProductVariation = (
    variationAttributes,
    regularPrice,
    salePrice,
    quantity
  ) => {
    this.props.onAddedProductVariation(
      this.state.product.id,
      variationAttributes,
      regularPrice,
      salePrice,
      quantity
    );
  };

  handleSave(dontShow) {
    this.setState(
      (prevState) => {
        let product = { ...prevState.product };
        switch (this.state.mode) {
          case "add":
            product.stock_quantity++;
            break;
          case "remove":
            product.stock_quantity--;
            break;
          case "reset":
            product.stock_quantity = 0;
            break;
          case "none":
            break;
        }

        return {
          product: product,
          loading: true,
          mode: "none",
          open: false,
        };
      },
      () => {
        Cookies.set(DONT_SHOW_ROOT_PRODUCT_POPUP, dontShow, { expires: 30 });
        this.props.onQuantityChange(this.state.product);
      }
    );
  }

  handleCancel() {
    this.setState({
      open: false,
      mode: "none",
    });
  }

  shouldNotShowPopup() {
    let dontShowPopup = Cookies.get(DONT_SHOW_ROOT_PRODUCT_POPUP) === "true";
    return dontShowPopup;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        product: this.props.product,
        loading: false,
      });
    }
  }

  render() {
    return (
      <>
        <div className="ui card" style={{ marginTop: 30 }}>
          {this.state.open ? (
            <Message
              open={this.state.open}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              dontShow={this.shouldNotShowPopup()}
            />
          ) : null}
          <AddProductVariation
            attributes={this.state.product.attributes}
            onSave={this.handleAddedProductVariation}
            product={this.state.product}
          />
          {this.state.showOnlyVariantsProduct ? null : (
            <div className="content" style={{ padding: 0 }}>
              <div className="extra content" style={this.content_header}>
                <div style={this.header}>{this.state.product.name}</div>
                <div className="ui red small statistic" style={{ margin: 0 }}>
                  <div className="value">
                    {this.state.product.stock_quantity}
                  </div>
                  <div className="label">Qty</div>
                </div>
              </div>

              <div className="extra content" style={this.content_buttons}>
                <button
                  style={{ margin: 18 }}
                  className="big ui  circular  basic positive button"
                  onClick={this.handleAdd}
                  disabled={this.state.loading}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  style={{ margin: 18 }}
                  className="big ui circular basic red button"
                  onClick={this.handleRemove}
                  disabled={this.state.loading}
                >
                  {this.state.loading} <i className="fas fa-minus"></i>
                </button>
                <button
                  style={{ margin: 18 }}
                  className="big ui  circular black basic button"
                  onClick={this.handleReset}
                  disabled={this.state.loading}
                >
                  0
                </button>
              </div>
            </div>
          )}
        </div>

        {this.state.product.product_variations ? (
          <ProductVariations
            variations={this.state.product.product_variations}
            name={this.state.product.name}
            change={this.handleVariationChange}
          />
        ) : null}
      </>
    );
  }
}

export default Product;
