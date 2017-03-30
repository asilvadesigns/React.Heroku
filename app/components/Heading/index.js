import React, { Component } from 'react';
import CONFIG from 'Styles';

class Heading extends Component {
  render() {
    return (
      <h1>
        { this.props.children }
      </h1>
    )
  }
}

export default Heading;
