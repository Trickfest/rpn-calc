import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrolled } from 'react-stay-scrolled';

//export class Counter extends Component {
export class StackElement extends Component {
    static propTypes = {
        stayScrolled: PropTypes.func
    }

    isNullOrEmpty(str) {
        return !str || !str.trim();
    }

    componentDidMount() {
        const { stayScrolled } = this.props;

        // Make the parent StayScrolled component stays scrolled down
        stayScrolled();
    }

    render() {
        return (<div className="stackelement">{this.props.text}</div>);
    }
}

export default scrolled(StackElement);