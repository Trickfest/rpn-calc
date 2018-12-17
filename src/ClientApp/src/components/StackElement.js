import React, { Component, propTypes } from 'react';
import PropTypes from 'prop-types';
import { scrolled } from 'react-stay-scrolled';

//export class Counter extends Component {
export class StackElement extends Component {
    static propTypes = {
        stayScrolled: PropTypes.func,
        scrollBottom: PropTypes.func,
    }

    isNullOrEmpty(str) {
        return !str || !str.trim();
    }

    componentDidMount() {
        const { stayScrolled, scrollBottom } = this.props;

        // Make the parent StayScrolled component scroll down if it was already scrolled
        stayScrolled();

        // Make the parent StayScrolled component scroll down, even if not completely scrolled down
        // scrollBottom();
    }

    render() {
        return (<div className="stackelement">{this.props.text}</div>);
    }
}

export default scrolled(StackElement);