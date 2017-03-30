import React, { Component } from 'react';
import Test from 'Components/Test';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Home
        <Test/>
      </div>
    )
  }
}

export default Home;
