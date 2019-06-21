import React from "react";
import _ from "lodash";

class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "null"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      menuItemsFull: this.props.menuItemsFull
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const selectedClass = _.find(this.state.menuItemsFull, {
      _id: this.state.value
    });
    this.props.selectDefaultClass(selectedClass);
  }

  render() {
    console.log("state:", this.state);
    if (!this.props.menuItemsFull) {
      return null;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.props.instructions}
            <select value={this.state.value} onChange={this.handleChange}>
              {this.props.menuItemsFull.map(item => {
                return (
                  <option value={item._id}>{item.class_description}</option>
                );
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
