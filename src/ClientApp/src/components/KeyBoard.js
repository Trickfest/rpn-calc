import React, { Component } from 'react';

export class KeyBoard extends Component {
  displayName = KeyBoard.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="keyboard">
        <p>KeyBoard</p>
      </div>
    );
  }
}
