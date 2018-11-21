import React, { Component } from 'react';
import StayScrolled from 'react-stay-scrolled';
import StackElement from './StackElement';

export class Stack extends Component {
  displayName = Stack.name

  constructor(props) {
    super(props);

    var stackelement = { text: "123" };
    var blankstackelement = { text: " " };
    this.state = { stack: [blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, blankstackelement, stackelement, stackelement, stackelement] };

    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.swap = this.swap.bind(this);
  }

  push(x) {
    this.state.stack.push(x);
  }

  pop() {
    return this.state.stack.pop();
  }

  swap(x) {
    var t = this.pop();
    this.push(x);
    return t;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stack.length < this.props.stack.length)
      this.stayScrolled(); // Or: this.scrollBottom
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
