import React, { Component } from 'react';

export class Stack extends Component {
  displayName = Stack.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="stack">
        <p>Stack</p>
      </div>
    );
  }
}
