import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './CalculatorStyles.css';
import { Display } from './Display';
import { KeyBoard } from './KeyBoard';

export class Calculator extends Component {
    displayName = Calculator.name

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="calculator">
                <h1>Calculator</h1>
                <Display />
                <KeyBoard />
            </div>
        );
    }
}
