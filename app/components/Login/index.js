import React, { Component } from 'react';
import CONFIG from 'Config';

import Firebase from 'firebase';
const provider = new Firebase.auth.GoogleAuthProvider();

class Login extends Component {
  constructor() {
    super();

    this.DB = CONFIG.FIREBASE.database();

    this.state = {
      isOpen: false,
      loggedIn: false,
      userName: '',
    }

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);

    this._toggleOpen = this._toggleOpen.bind(this);
  }

  /*
   *init
   */
  componentDidMount() {
    CONFIG.FIREBASE.auth().onAuthStateChanged((user) => {
      if (user) {
        this._loginState(user);
      } else {
        this._logoutState(user);
      }
    })
  }

  /*
   *utilities
   */
  _loginState(user) {
    this.setState({
      loggedIn: true,
      userName: user.displayName
    })
  }

  _logoutState(user) {
    this.setState({
      loggedIn: false,
      userName: ''
    })
  }

  _login() {
    CONFIG.FIREBASE.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.DB.ref(`users/${user.uid}`).set({
        name: user.displayName,
        email: user.email,
      })
      this._loginState(user);
    }).catch((error) => {
      console.log('log in error:', error);
    })
  }

  _logout() {
    CONFIG.FIREBASE.auth().signOut().then(() => {
      this._logoutState(user);
    }).catch((error) => {
      console.log('log out error:', error);
    })
  }

  _toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const DropdownStyle = {
      position: 'relative',
    }

    const DropdownMenuStyle = {
      position: 'absolute',
      top: '100%',
      right: '0',
      padding: '1rem',
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '0.25rem',
      minWidth: '180px',
    }

    const LoginButton  = <button type="button" onClick={this._login}>Login with Google</button>;
    const LogoutButton = <button type="button" onClick={this._logout}>Logout</button>;
    const DropdownMenu = (
      <div style={DropdownMenuStyle}>
        { this.state.loggedIn ? `Welcome ${this.state.userName}` : '' }
        { this.state.loggedIn ? LogoutButton : LoginButton }
      </div>
    );

    return (
      <div style={DropdownStyle}>
        <button type='button' onClick={this._toggleOpen}>Open</button>
        { this.state.isOpen ? DropdownMenu : null }
      </div>
    )
  }
}

export default Login;
