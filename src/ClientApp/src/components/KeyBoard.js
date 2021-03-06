import React, { Component } from 'react';
import { Stack } from './Stack';
import { InputLine } from './InputLine';

export class KeyBoard extends Component {
  displayName = KeyBoard.name

  ERROR_TEXT = "ERROR";
  OVERFLOW_TEXT = "OVERFLOW";
  MAX_DIGITS = 9;
  KEY_FLASH_COLOR = "gray";

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeypress, false);
    document.addEventListener("keydown", this.handleKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeypress, false);
    document.removeEventListener("keydown", this.handleKeydown, false);
  }

  handleKeypress(event) {
    switch (event.keyCode) {
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        this.handleInput(String.fromCharCode(event.keyCode));
        break;

      case 46:
        this.handleInput("DECIMAL");
        break;

      case 43:
        this.handleInput("ADD");
        break;

      case 45:
        this.handleInput("SUB");
        break;

      case 42:
        this.handleInput("MULT");
        break;

      case 47:
        this.handleInput("DIV");
        break;

      case 13:
        this.handleInput("ENT");
        break;

      case 78:
      case 110:
        this.handleInput("POS-NEG"); // N or n
        break;

      case 8:
        this.handleInput("DEL");
        break;

      default: // ignore anything else - default is specified to suppress compilation warning
        break;
    }
  }

  handleKeydown(event) {
    if (event.keyCode === 27) { // ESC - clear out inputline
      this.handleInput("CE");
    }
    else if (event.keyCode === 46) { // DEL
      this.handleInput("DEL");
    }
  }

  handleClick(event) {
    this.handleInput(event.target.id)
  }

  handleInput(id) {
    this.flashDiv(id);

    var inputLine = this.getInputLine();

    switch (id) {
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
        if (this.strDigits(inputLine) >= this.MAX_DIGITS)
          break;

        if ((inputLine === "0") || this.isErrorMsg(inputLine)) {
          this.setInputLine(id);
        }
        else if (inputLine === "-0") {
          this.setInputLine("-" + id);
        }
        else {
          this.setInputLine(inputLine + id);
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
        this.evalOp(id, inputLine)
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
        alert("unhandled input"); // serious bug if this code is reached
        break;
    }
  }

  flashDiv(id) {
    var color = document.getElementById(id).style.color;

    document.getElementById(id).style.backgroundColor = this.KEY_FLASH_COLOR;

    // after a tenth of a second, set element back to its original color
    setTimeout(function () {
      document.getElementById(id).style.backgroundColor = color;
    }, 100);
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
        alert("invalid operator"); // serious bug if this code is reached
        break;
    }

    fetch('api/rpneval/' + op1 + '/' + op2 + '/' + operatorSymbol)
      .then(response => response.json())
      .then(data => {
        if (data.answer == null) {
          this.setInputLine(this.ERROR_TEXT);
        }
        else {
          var constrainedNumber = this.constrainNumber(data.answer);

          if (this.strDigits(constrainedNumber) > this.MAX_DIGITS) {
            this.setInputLine(this.OVERFLOW_TEXT);
          }
          else {
            this.setInputLine(constrainedNumber);
          }
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
  // intentionally not a general purpose
  // routine - requires a well formed 
  // decimal number
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

  // If necessary and possible, limit the precision of the number in order to keep number of digits < MAX_DIGITS
  // If necessary, truncate digits to right of the decimal point in order to fit within the MAX_DIGITS limit
  // Delete any leading or trailing zeroes
  // Delete trailing decimal point
  // 
  // Note: number may still exceed MAX_DIGITS after limiting precision - that is expected behavior and will
  // be handled elsewhere
  constrainNumber(s) {
    // if string contains a decimal, delete trailing zeroes
    if (s.indexOf(".") !== -1) {
      s = s.replace(/0+$/, '');
    }

    // if number ends in decimal, trim it
    s = s.replace(/\.+$/, '');

    if (s.indexOf(".") === -1) { // if no decimal - nothing to do
      return s;
    }

    // split number into left of decimal and right of decimal
    var a = s.split(".");

    // figure out how many digits after the decimal we can handle
    var precision = Math.max(this.MAX_DIGITS - this.strDigits(s) + a[1].length, 0);

    // get the float value of the string
    var floatVal = parseFloat(s);

    // convert to string of fixed precision
    s = floatVal.toFixed(precision);

    // if fractional number (pos or neg), then delete leading zero
    if (Math.abs(floatVal) < 1.0) {
      s = s.replace('0', '');
    }

    // if number has decimal, then trim any trailing zeroes
    if (s.indexOf(".") !== -1) {
      s = s.replace(/0+$/, '');
    }

    // finally, if number ends in decimal, trim it
    s = s.replace(/\.+$/, '');

    return s;
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
