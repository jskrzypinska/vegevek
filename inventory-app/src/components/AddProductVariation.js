import React, { Component } from "react";
import { Button, Header, Modal, Dropdown } from "semantic-ui-react";

export default class AddProductVariation extends Component {
  state = {
    modalOpen: false,
    attributes: this.props.attributes,
    selectedVariations: [],
    quantity: 0,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    console.log("Handle close");
    this.setState({ modalOpen: false });
  };

  handleSave = () => {
    let variations = this.state.selectedVariations.map((v) => {
      return { id: v.attrid, option: v.value };
    });

    this.props.onSave(variations, this.state.quantity);
    this.setState({ modalOpen: false });
  };

  handleChange = (e, key) => {
    const attributeId = key.options[0].attrid;
    const selectedValue = key.value;
    let elementIndex = this.state.selectedVariations.findIndex(
      (v) => v.attrid === attributeId
    );
    if (elementIndex !== -1) {
      this.setState((prev) => {
        const variations = [...prev.selectedVariations];
        variations[elementIndex].value = selectedValue;
        return { selectedVariations: variations };
      });
    } else {
      this.setState((prev) => ({
        selectedVariations: [
          ...prev.selectedVariations,
          { attrid: attributeId, value: selectedValue },
        ],
      }));
    }
  };

  handleQuantityChange = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  mapToDropdown = (options, attributeId) => {
    // console.log("options", options);

    return options.map((attrOption, index) => {
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
    return (
      <Dropdown
        onChange={this.handleChange}
        key={attr.id}
        clearable
        options={this.mapToDropdown(attr.options, attr.id)}
        selection
        placeholder={attr.name}
        style={{ margin: 5 }}
      />
    );
  };

  render() {
    const { attributes, modalOpen } = this.state;

    return (
      <Modal
        trigger={
          <Button style={{ fontSize: 15 }} onClick={this.handleOpen}>
            Add variation
          </Button>
        }
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Add variation" style={{ margin: 5 }} />
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
                  placeholder="Enter amount..."
                  min="0"
                  max="100"
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange}
                  step="1"
                  pattern="\d+"
                />
                <div className="ui basic label label">Qty</div>
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
