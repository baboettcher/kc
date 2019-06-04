import React from "react";

class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "coconut" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  render() {
    console.log("PROPS===>>>", this.props.menuItems);
    if (!this.props.menuItems) {
      return null;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.props.instructions}
            <select value={this.state.value} onChange={this.handleChange}>
              {this.props.menuItems.map(item => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
}

export default SelectForm;
