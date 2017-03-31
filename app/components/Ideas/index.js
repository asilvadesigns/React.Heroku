import React, { Component } from 'react';
import CONFIG from 'Config';

class ListUsers extends Component {
  constructor() {
    super();
    this.state = { ideas: [] }
    this.removeIdea = this.removeIdea.bind(this);
  }

  componentWillMount() {
    this.addDBListener();
  }

  addDBListener() {
    const IDEAS = CONFIG.FIREBASE.database().ref('ideas');
    IDEAS.on('value', snapshot => {
      let snapshotIdeas = [];
      snapshot.forEach( childSnapshot => {

        let idea = childSnapshot.val();
        idea['key'] = childSnapshot.key;
        snapshotIdeas.push(idea);

      });
      this.setState({ ideas: snapshotIdeas });
    });
  }

  removeIdea(evt) {
    const KEY = evt.target.getAttribute('data-key');
    const REF = CONFIG.FIREBASE.database().ref('ideas/');
    REF.child(KEY).remove()
      .then(() => {
        console.log('Remove succeeded.')
      })
      .catch((error) => {
        console.log('Remove failed: ' + error.message)
      });
  }

  render() {
    const IDEAS = this.state.ideas;
    const IDEASX = {
      margin: '0.8rem 1.0rem',
      display: 'flex',
      justifyContent: 'space-between',
    }

    return (
      <div>
        <header>Ideas:</header>
        <div>
          {IDEAS.map((IDEA) =>
            <div style={IDEASX} key={IDEA.key}>
              {IDEA.idea}
              <button type='button' data-key={IDEA.key} onClick={this.removeIdea}>Remove</button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

class Ideas extends Component {
  constructor() {
    super();
    this.state = { newIdeaValue: '' }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ newIdeaValue: evt.target.value });
  }

  handleClick() {
    const IDEAS = CONFIG.FIREBASE.database().ref('ideas');
    const newIdea = IDEAS.push();
    newIdea.set({ idea: this.state.newIdeaValue });
    this.setState({ newIdeaValue: '' });
    this.textInput.value = '';
    this.textInput.focus();
  }

  render() {
    return (
      <div>
        <ListUsers />
        <br/>
        <input type="text" onChange={this.handleChange} ref={input => {this.textInput = input;}}/>
        <br/>
        <button type='button' onClick={this.handleClick}>Add some stuff.</button>
      </div>
    )
  }
}

export default Ideas;
