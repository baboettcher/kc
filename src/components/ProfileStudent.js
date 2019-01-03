import React, { Component } from "react";

class ProfileStudent extends Component {
  state = {};
  render() {
    console.log(this.props);
    const { first_name, last_name } = this.props.profileStudent;

    return (
      <div>
        <h2>
          Current Student: {first_name} {last_name}
        </h2>
      </div>
    );
  }
}

export default ProfileStudent;
