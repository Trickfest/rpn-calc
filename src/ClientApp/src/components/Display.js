import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';
import { KeyBoard } from './KeyBoard';

export class Display extends Component {
  displayName = Display.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Display</h2>
        <Stack/>
        <InputLine/>
        <KeyBoard/>
      </div>
    );
  }
}
