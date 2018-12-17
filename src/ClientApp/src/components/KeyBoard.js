import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';

export class KeyBoard extends Component {
  displayName = KeyBoard.name

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (this.getInputLine.length >= 9)
          break;

        if (this.getInputLine() === "0") {
          this.setInputLine(event.target.id);
        }
        else {
          this.setInputLine(this.getInputLine() + event.target.id);
        }
        break;

      case "CE":
        this.setInputLine("0");
        break;

      case "C":
        this.stackReset();
        this.setInputLine("0");
        break;

      case "DEL":
        break;

      case "DIV":
        break;

      case "MULT":
        break;

      case "SUB":
        break;

      case "ADD":
        this.stackPop();
        break;

      case "DECIMAL":
        if (!this.getInputLine().includes(".")) {
          this.setInputLine(this.getInputLine() + ".");
        }
        break;

      case "POS-NEG":
        break;

      case "ENT":
        this.stackPush(this.getInputLine());
        this.setInputLine("0");
        break;

      default:
        alert("unhandled input"); // bug if this code is reached
        break;
    }
  }

  getInputLine() {
    return InputLine._instance.get();
  }

  setInputLine(s) {
    InputLine._instance.set(s);
  }

  stackPush(s) {
    Stack._instance.push(s);
  }

  stackPop() {
    return Stack._instance.pop();
  }

  stackReset() {
    Stack._instance.reset();
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-xs-3 button" onClick={this.handleClick} id="CE">CE</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="C">C</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="DEL">DEL</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="DIV">/</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button" onClick={this.handleClick} id="7">7</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="8">8</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="9">9</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="MULT">*</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button" onClick={this.handleClick} id="4">4</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="5">5</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="6">6</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="SUB">-</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button" onClick={this.handleClick} id="1">1</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="2">2</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="3">3</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="ADD">+</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button" onClick={this.handleClick} id="DECIMAL">.</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="0">0</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="POS-NEG">+-</div>
          <div class="col-xs-3 button" onClick={this.handleClick} id="ENT">ENT</div>
        </div>
      </div>
    );
  }
}
