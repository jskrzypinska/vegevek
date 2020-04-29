import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class ModalEditVariation extends Component {
  state = { open: false };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false });

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;

    return (
      <div>
        <Button
          style={{ width: "100%", backgroundColor: "#666666", color: "white" }}
          onClick={this.closeConfigShow(true, false)}
        >
          Edit
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Edit variation</Modal.Header>
          <Modal.Content style={{ display: "flex", flexDirection: "column" }}>
            <div className="ui right labeled input" style={{ margin: 5 }}>
              <input
                type="number"
                placeholder="Enter regular price"
                min="0"
                max="100"
                value={this.state.regularPrice}
                onChange={this.handleRegularPriceChange}
              />
              <div className="ui basic label">$</div>
            </div>
            <div className="ui right labeled input" style={{ margin: 5 }}>
              <input
                type="number"
                placeholder="Enter sale price"
                min="0"
                max="100"
                value={this.state.salePrice}
                onChange={this.handleSalePriceChange}
              />
              <div className="ui basic label">$</div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalEditVariation;
