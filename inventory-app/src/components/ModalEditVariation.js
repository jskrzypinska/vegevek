import React, { Component } from "react";
import { Button, Modal, Dropdown, Header } from "semantic-ui-react";

class ModalEditVariation extends Component {
  state = {
    modalOpen: false,
    attributes: this.props.attributes,
    variation: this.props.variation,
    // selectedVariations: [],
    // regularPrice: "",
    // salePrice: "",
    // quantity: "",
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleSave = () => {
    this.props.change(this.state.variation);
    this.setState({ modalOpen: false });
  };

  handleChange = (e, key) => {
    const attributeId = key.options[0].attrid;
    const selectedValue = key.value;
    let elementIndex = this.state.variation.attributes.findIndex(
      (v) => v.id === attributeId
    );
    if (elementIndex !== -1) {
      this.setState((prev) => {
        const variation = prev.variation;
        variation.attributes[elementIndex].option = selectedValue;
        return { variation: variation };
      });
    } else {
      this.setState((prev) => {
        const variation = prev.variation;
        variation.attributes.push({ id: attributeId, option: selectedValue });
        return { variation: variation };
      });
    }
  };

  handleQuantityChange = (e) => {
    const stock_quantity = e.target.value ? parseInt(e.target.value) : "";
    this.setState((prev) => {
      const variation = prev.variation;
      variation.stock_quantity = stock_quantity;
      return { variation: variation };
    });
  };

  handleRegularPriceChange = (e) => {
    const regular_price = e.target.value;
    this.setState((prev) => {
      const variation = prev.variation;
      variation.regular_price = regular_price;
      return { variation: variation };
    });
  };

  handleSalePriceChange = (e) => {
    const sale_price = e.target.value;
    this.setState((prev) => {
      const variation = prev.variation;
      variation.sale_price = sale_price;
      return { variation: variation };
    });
  };

  mapToDropdown = (options, attributeId) => {
    // console.log("options", options);

    return options.map((attrOption) => {
      // console.log("obj", obj);
      const obj = {
        attrid: attributeId,
        key: attrOption,
        text: attrOption,
        value: attrOption,
      };
      return obj;
    });
  };

  mapAttribute = (attr) => {
    const variationAttribute = this.state.variation.attributes.find(
      (a) => a.id === attr.id
    );

    return (
      <Dropdown
        onChange={this.handleChange}
        key={attr.id}
        clearable
        options={this.mapToDropdown(attr.options, attr.id)}
        selection
        placeholder={attr.name}
        style={{ margin: 5 }}
        value={variationAttribute ? variationAttribute.option : null}
      />
    );
  };

  render() {
    const { attributes, modalOpen } = this.state;

    return (
      <Modal
        trigger={
          <Button style={{ fontSize: 15 }} onClick={this.handleOpen}>
            Edit
          </Button>
        }
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Header
          icon="browser"
          content={`Edit variation `}
          style={{ margin: 5 }}
        />
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {attributes.length > 0 ? (
            <>
              {attributes.map(this.mapAttribute)}
              <div className="ui right labeled input" style={{ margin: 5 }}>
                <input
                  type="number"
                  placeholder="Edit amount..."
                  min="0"
                  max="100"
                  value={this.state.variation.stock_quantity}
                  onChange={this.handleQuantityChange}
                  step="1"
                  pattern="\d+"
                />
                <div className="ui basic label label">Stock Quantity</div>
              </div>
              <div className="ui right labeled input" style={{ margin: 5 }}>
                <input
                  type="number"
                  placeholder="Edit regular price"
                  min="0"
                  max="100"
                  value={this.state.variation.regular_price}
                  onChange={this.handleRegularPriceChange}
                />
                <div className="ui basic label">Regular Price (zł)</div>
              </div>
              <div className="ui right labeled input" style={{ margin: 5 }}>
                <input
                  type="number"
                  placeholder="Edit sale price"
                  min="0"
                  max="100"
                  value={this.state.variation.sale_price}
                  onChange={this.handleSalePriceChange}
                />
                <div className="ui basic label">Sale Price (zł)</div>
              </div>
            </>
          ) : (
            <h4>No attributes</h4>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.handleClose}>
            Leave
          </Button>
          <Button color="green" onClick={this.handleSave} inverted>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalEditVariation;
