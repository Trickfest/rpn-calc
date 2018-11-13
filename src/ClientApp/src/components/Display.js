import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';

export class Display extends Component {
    displayName = Display.name

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Stack />
                <InputLine />
            </div>
        );
    }
}
