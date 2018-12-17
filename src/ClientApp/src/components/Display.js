import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';

export class Display extends Component {
    displayName = Display.name

    render() {
        return (
            <div>
                <Stack />
                <InputLine />
            </div>
        );
    }
}
