import React, { Component } from 'react';
import { Display } from './Display';
import { KeyBoard } from './KeyBoard';

export class Calculator extends Component {
    displayName = Calculator.name

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Calculator</h1>
                <Display />
                <KeyBoard />
            </div>
        );
    }
}
