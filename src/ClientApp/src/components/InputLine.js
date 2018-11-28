import React, { Component } from 'react';

export class InputLine extends Component {
  displayName = InputLine.name

  constructor(props) {
    super(props);

    var inputLineText = "0";

    this.state = { inputLineText: inputLineText }

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  set(s) {
    this.state.inputLineText = s;
    return s;
  }

  get(s) {
    return this.state.inputLineText;
  }

  render() {
    return (
      <div class="inputline row">
        InputLine
      </div>
    );
  }
}
