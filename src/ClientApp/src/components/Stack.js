import React, { Component } from 'react';
import StayScrolled from 'react-stay-scrolled';
import StackElement from './StackElement';

export class Stack extends Component {
  displayName = Stack.name

  constructor(props) {
    super(props);

    var fillerstackelement = { text: " " };

    var stack = [];
    for (var i = 0; i < 15; i++) {
      stack.push(fillerstackelement);
    }

    this.stackCount = 0;

    this.state = { stack: stack };

    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.swap = this.swap.bind(this);
    this.reset = this.reset.bind(this);

    Stack._instance = this;
  }

  push(x) {
    var stackelement = { text: x };
    this.state.stack.push(stackelement);
    this.stackCount++;

    this.setState({ stack: this.state.stack });
  }

  pop() {
    if (this.stackCount < 1)
      return null;

    this.stackCount--;
    var result = this.state.stack.pop().text;
    this.setState({ stack: this.state.stack });
    return result;
  }

  swap(x) {
    if (this.stackCount < 1)
      return null;

    var t = this.pop();
    this.push(x);
    return t;
  }

  reset() {
    while (this.pop() != null);
    this.setState({ stack: this.state.stack });
  }

  componentDidUpdate(prevProps) {
    //if (prevProps.stack.length < this.props.stack.length)
    //  this.stayScrolled(); // Or: this.scrollBottom
  }

  storeScrolledControllers = ({ stayScrolled, scrollBottom }) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }

  render() {
    return (
      <StayScrolled provideControllers={this.storeScrolledControllers} class="row stack">
        {
          this.state.stack.map(
            (stackelement, i) => <StackElement text={stackelement.text} key={i} />
          )
        }
      </StayScrolled>
    );
  }
}
