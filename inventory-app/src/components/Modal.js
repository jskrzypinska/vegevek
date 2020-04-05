import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";

export default class ModalControlled extends Component {
  state = { modalOpen: false, key: "", secret: "", rememberMe: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = e => {
    const input = e.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
  };

  handleFormSubmit = () => {
    const { key, secret, rememberMe } = this.state;
    Cookies.set("rememberMe", rememberMe);
    if (rememberMe) {
      Cookies.set("key", key, { expires: 30 });
      Cookies.set("secret", secret, { expires: 30 });
    } else {
      Cookies.set("key", key);
      Cookies.set("secret", secret);
    }
  };
  componentDidMount() {
    const rememberMe = Cookies.get("rememberMe") === "true";
    const key = rememberMe ? Cookies.get("key") : "";
    const secret = rememberMe ? Cookies.get("secret") : "";
    this.setState({ key, secret, rememberMe });
  }
  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen}>
            <i className="fas fa-cog"></i>
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="browser" content="Settings" />
        <Modal.Content>
          <form onSubmit={this.handleFormSubmit} className="ui form">
            <div className="field">
              <label>
                <input
                  name="key"
                  value={this.state.key}
                  onChange={this.handleChange}
                  placeholder="Customer Key"
                />
              </label>
            </div>
            <div className="field">
              <label>
                <input
                  name="secret"
                  value={this.state.secret}
                  onChange={this.handleChange}
                  placeholder="Customer Secret"
                />
              </label>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  name="rememberMe"
                  checked={this.state.rememberMe}
                  onChange={this.handleChange}
                  type="checkbox"
                />
                <label style={{ color: "white" }}>Remember me</label>
              </div>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  name="showVariantProduct"
                  // checked={this.state.rememberMe}
                  // onChange={this.handleChange}
                  type="checkbox"
                />
                <label style={{ color: "white" }}>
                  Only show variants if product is a variable product
                </label>
              </div>
            </div>
            <button className="ui button" type="submit">
              Save
            </button>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Back
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
