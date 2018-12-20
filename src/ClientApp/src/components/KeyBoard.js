import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';

export class KeyBoard extends Component {
  displayName = KeyBoard.name

  ERROR_TEXT = "ERROR";
  OVERFLOW_TEXT = "OVERFLOW";

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    var inputLine = this.getInputLine();

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
        // ignore input over a somewhat arbitrary length cap - similar to iPhone calculator
        if (this.strDigits(inputLine) >= 9)
          break;

        if ((inputLine === "0") || this.isErrorMsg(inputLine)) {
          this.setInputLine(event.target.id);
        }
        else if (inputLine === "-0") {
          this.setInputLine("-" + event.target.id);
        }
        else {
          this.setInputLine(inputLine + event.target.id);
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
        var inputLineLen = inputLine.length;
        var inputLineVal = parseFloat(inputLine);

        if (inputLine === "0") {
          break; // do nothing
        }
        else if (this.isErrorMsg(inputLine)) {
          this.setInputLine("0");
        }
        else if (inputLineVal === 0.0) {
          this.setInputLine("0"); // convert -0, 0. and -0. to just 0
        }
        else if ((inputLineLen === 1) || (inputLineLen === 2 && inputLine[0] === '-')) {
          this.setInputLine("0"); // if only a single digit (either positive or negative), convert to 0
        }
        else {
          this.setInputLine(inputLine.substr(0, inputLineLen - 1)); // chop off trailing character (digit or decimal)
        }
        break;

      case "DIV":
      case "MULT":
      case "SUB":
      case "ADD":
        if (this.isErrorMsg(inputLine)) {
          break; // do nothing
        }
        this.evalOp(event.target.id, inputLine)
        break;

      case "DECIMAL":
        if (this.isErrorMsg(inputLine)) {
          break; // do nothing
        }

        if (!inputLine.includes(".")) {
          this.setInputLine(inputLine + ".");
        }
        break;

      case "POS-NEG":
        if (this.isErrorMsg(inputLine)) {
          break; // do nothing
        }

        if (inputLine.charAt(0) === '-') {
          inputLine = inputLine.substr(1);
        }
        else {
          inputLine = "-" + inputLine;
        }
        this.setInputLine(inputLine);
        break;

      case "ENT":
        if (this.isErrorMsg(inputLine)) {
          break; // do nothing
        }

        this.stackPush(inputLine);
        this.setInputLine("0");
        break;

      default:
        alert("unhandled input"); // bug if this code is reached
        break;
    }
  }

  evalOp(operator, inputLine) {
    var op1 = this.stackPop();
    var op2 = inputLine;
    var operatorSymbol;

    switch (operator) {
      case "DIV":
        operatorSymbol = "d";
        break;

      case "MULT":
        operatorSymbol = "m";
        break;

      case "SUB":
        operatorSymbol = "s";
        break;

      case "ADD":
        operatorSymbol = "a";
        break;

      default:
        alert("invalid operator"); // bug if this code is reached
        break;
    }

    fetch('api/rpneval/' + op1 + '/' + op2 + '/' + operatorSymbol)
      .then(response => response.json())
      .then(data => {
        if (data.answer == null) {
          this.setInputLine(this.ERROR_TEXT);
        }
        else if (this.strDigits(data.answer) > 9) {
          this.setInputLine(this.OVERFLOW_TEXT);
        }
        else {
          this.setInputLine(data.answer);
        }
      });
  }

  getInputLine() {
    return InputLine._instance.get();
  }

  setInputLine(s) {
    InputLine._instance.set(s);
  }

  isErrorMsg(s) {
    return (s === this.ERROR_TEXT || s === this.OVERFLOW_TEXT);
  }

  stackPush(s) {
    Stack._instance.push(s);
  }

  stackPop() {
    var r = Stack._instance.pop();

    // if the stack is empty, then a zero is implied
    // this appears to be what the old HP calculators did
    // https://hp15c.com/web/hp15c.html
    if (r === null) {
      r = "0";
    }

    return r;
  }

  stackReset() {
    Stack._instance.reset();
  }

  // return number of digits in string
  strDigits(s) {
    var result = s.length;

    if (s.includes(".")) {
      result--;
    }

    if (s.includes("-")) {
      result--;
    }

    return result;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-3 button" onClick={this.handleClick} id="CE">CE</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="C">C</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="DEL">DEL</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="DIV">/</div>
        </div>

        <div className="row">
          <div className="col-xs-3 button" onClick={this.handleClick} id="7">7</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="8">8</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="9">9</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="MULT">*</div>
        </div>

        <div className="row">
          <div className="col-xs-3 button" onClick={this.handleClick} id="4">4</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="5">5</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="6">6</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="SUB">-</div>
        </div>

        <div className="row">
          <div className="col-xs-3 button" onClick={this.handleClick} id="1">1</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="2">2</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="3">3</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="ADD">+</div>
        </div>

        <div className="row">
          <div className="col-xs-3 button" onClick={this.handleClick} id="DECIMAL">.</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="0">0</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="POS-NEG">+-</div>
          <div className="col-xs-3 button" onClick={this.handleClick} id="ENT">ENT</div>
        </div>
      </div>
    );
  }
}
