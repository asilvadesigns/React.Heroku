import React, { Component } from 'react';
import CONFIG from 'Config';

class ListUsers extends Component {
  constructor() {
    super();
    this.state = { users: [], ideas: [] }
  }

  componentDidMount() {
    const USERS = CONFIG.FIREBASE.database().ref('users');
    USERS.on('value', (snapshot) => {
      let users = [];
      snapshot.forEach((childSnapshot) => {
        let user = childSnapshot.val();
        user['.key'] = childSnapshot.key;
        users.push(user);
      });
      this.setState({ users: users });
    })

    const IDEAS = CONFIG.FIREBASE.database().ref('ideas');
    IDEAS.on('value', (snapshot) => {
      let ideas = [];
      snapshot.forEach((childSnapshot) => {
        let idea = childSnapshot.val();
        idea['.key'] = childSnapshot.key;
        ideas.push(idea);
      });
      this.setState({ ideas: ideas });
    })
  }

  render() {
    const USERS = this.state.users;
    const IDEAS = this.state.ideas;

    return (
      <div>
        <div>
          Users:
          {USERS.map((USERS) =>
            <p key={USERS.key}>{USERS.name} : {USERS.email} : {USERS.lastLogin}</p>
          )}
        </div>
        <br/>
        <div>
          Ideas:
          {IDEAS.map((IDEAS) =>
            <p key={IDEAS.key}>{IDEAS.idea}</p>
          )}
        </div>
      </div>
    )
  }
}

class Test extends Component {
  constructor() {
    super();

    this.state = { newIdeaValue: '' }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ newIdeaValue: evt.target.value })
  }

  handleClick() {
    const IDEAS = CONFIG.FIREBASE.database().ref('ideas');
    const newIdeaRef = IDEAS.push();
    newIdeaRef.set({
      idea: this.state.newIdeaValue
    })
  }

  render() {
    return (
      <div>
        <ListUsers />
        <br/>
        <input type="text" onChange={this.handleChange}/>
        <br/>
        <button type='button' onClick={this.handleClick}>Add some stuff.</button>
      </div>
    )
  }
}

export default Test;
