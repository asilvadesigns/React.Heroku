import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from 'Components/Navbar';
import CONFIG from 'Config';

class App extends Component {
  constructor() {
    super();
    this.state = { user: '' }
  }

  componentDidMount() {
    CONFIG.FIREBASE.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        console.log(`App says: ${user.displayName} logged in`);
      } else {
        this.setState({ user: '' });
        console.log('App says: someone logged out');
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          {CONFIG.ROUTES.map((route, i) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}/>
          ))}
        </div>
      </Router>
    )
  }
}

export default App;
