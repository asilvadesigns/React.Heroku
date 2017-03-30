import React, { Component } from 'react';
import CONFIG from 'Config';

class Test extends Component {
  constructor() {
    super();

    this.state = {
      testValue: ''
    }

    this.DB = CONFIG.FIREBASE.database();

    this._handleClick = this._handleClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }


  _handleChange(e) {
    this.setState({
      testValue: e.target.value
    })
  }

  _handleClick() {
    this.DB.ref('problems/').set({
      problem_1: this.state.testValue
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this._handleChange}/>
        <br/>
        <button type='button' onClick={this._handleClick}>Add some stuff.</button>
      </div>
    )
  }
}

const Home = () => (
  <div>
    Enter a problem : )!
    <br/>
    <Test/>
  </div>
)

export default Home;
