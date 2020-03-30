import React from "react";
import VegevekService from "../vegevekService";

import { Dropdown } from "semantic-ui-react";
import { render } from "@testing-library/react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fetchCategory = this.fetchCategory.bind(this);
    this.state = {
      categories: this.props.categories,
      wybranaKategoriaId: ""
    };
    // console.log("state: ", this.state);
    // console.log("categories w konstruktorze", this.props.categories);
  }
  handleChange(event) {
    console.log("event zmiany kategorii:", event.target.value);
    this.setState({ wybranaKategoriaId: event.target.value });
  }
  handleSubmit(event) {
    console.log("handlesubmit", this.state.categories);
    this.props.onCategoryChange(this.state.wybranaKategoriaId);
    event.preventDefault();
  }
  componentDidMount() {
    //this.props.onCategoryChange();
  }

  mapCategory = category => {
    return (
      <>
        <option value={category.id}>{category.name}</option>
      </>
    );
  };
  render() {
    // console.log("categories", this.state.categories);
    // console.log("state: ", this.state);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Wybierz kategorię
            <select
              value={this.state.wybranaKategoriaId}
              onChange={this.handleChange}
            >
              {this.state.categories.map(this.mapCategory)}
            </select>
          </label>
          <input type="submit" value="Wyślij" />
        </form>
      </>
    );
  }
}
export default Category;
