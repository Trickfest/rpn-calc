import React, { Component } from 'react';

export class InputLine extends Component {
  displayName = InputLine.name

  constructor(props) {
    super(props);

    this.get = this.get.bind(this);
    this.get = this.get.bind(this);
  }

  set(s) {

  }

  get(s) {
    return "";
  }

  render() {
    return (
      <div class="inputline row">
        InputLine
      </div>
    );
  }
}
