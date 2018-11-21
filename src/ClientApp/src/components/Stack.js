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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stackelements.length < this.props.stackelements.length)
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
            (stackelement, i) => <StackElement text={stackelement.text} />
          )
        }
      </StayScrolled>
    );
  }
}
