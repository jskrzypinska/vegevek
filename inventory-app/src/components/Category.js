import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      categories: this.props.categories,
      chosenCategoryId: ""
    };
  }
  handleChange(event) {
    this.setState({ chosenCategoryId: event.target.value });
  }
  handleSubmit(event) {
    this.props.onCategoryChange(this.state.chosenCategoryId);
    event.preventDefault();
  }

  mapCategory = category => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  };
  render() {
    return (
      <>
        <form
          className="ui form"
          style={{ margin: 35 }}
          onSubmit={this.handleSubmit}
        >
          <h3 style={{ textAlign: "center" }}>Wybierz kategorię</h3>
          <select
            value={this.state.chosenCategoryId}
            onChange={this.handleChange}
          >
            {this.state.categories.map(this.mapCategory)}
          </select>

          <div className="ui fluid input">
            <input type="submit" value="Wyślij" />
          </div>
        </form>
      </>
    );
  }
}
export default Category;
