import React, { Component } from 'react';
import CONFIG from 'Config';
import Firebase from 'firebase';
import SX from './style';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      userName: '',
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.provider = new Firebase.auth.GoogleAuthProvider();
  }

  /*
   *  state utilities
   */
  setLoginState(user, isLoggedIn) {
    this.setState({
      loggedIn: isLoggedIn,
      userName: isLoggedIn ? user.displayName : ''
    })
  }

  /*
   *  firebase login init
   *
   *  listen for login changes, update state if user is present
   */
  componentDidMount() {
    CONFIG.FIREBASE.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginState(user, true);
      } else {
        this.setLoginState(user, false);
      }
    })
  }

  /*
   *  firebase login
   *
   *  on new user login, add them to the users object.
   */
  login() {
    CONFIG.FIREBASE.auth().signInWithPopup(this.provider).then((result) => {
      CONFIG.FIREBASE.database().ref(`users/${result.user.uid}`).set({
        name: result.user.displayName,
        email: result.user.email,
        lastLogin: Date(),
      })
      this.setLoginState(result.user, true);
    }).catch((error) => {
      console.log('log in error:', error);
    })
  }

  /*
   *  firebase logout
   */
  logout() {
    CONFIG.FIREBASE.auth().signOut().then((user) => {
      this.setLoginState(user, false);
    }).catch((error) => {
      console.log('log out error:', error);
    })
  }

  /*
   *  if logged in then show logout etc...
   */
  render() {
    const greeting = (
      <span style={{ ...this.props.style, ...SX.message }}>
        Hello {this.state.userName}.
      </span>
    );

    return (
      <div>
        { this.state.loggedIn ? greeting : '' }
        <button
          style={{ ...this.props.style, ...SX.button }}
          type='button'
          onClick={ this.state.loggedIn ? this.logout : this.login }>
          { this.state.loggedIn ? `Logout` : `Login` }
        </button>
      </div>
    )
  }
}

export default Login;
