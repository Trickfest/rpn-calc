import React, { Component } from 'react';

export class Calculator extends Component {
  displayName = Calculator.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Calculator</h1>
      </div>
    );
  }
}
