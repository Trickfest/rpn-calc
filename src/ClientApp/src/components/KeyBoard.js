import React, { Component } from 'react';

export class KeyBoard extends Component {
  displayName = KeyBoard.name

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="col-xs-3 button">CE</div>
          <div class="col-xs-3 button">C</div>
          <div class="col-xs-3 button">DEL</div>
          <div class="col-xs-3 button">/</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button">7</div>
          <div class="col-xs-3 button">8</div>
          <div class="col-xs-3 button">9</div>
          <div class="col-xs-3 button">*</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button">4</div>
          <div class="col-xs-3 button">5</div>
          <div class="col-xs-3 button">6</div>
          <div class="col-xs-3 button">-</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button">1</div>
          <div class="col-xs-3 button">2</div>
          <div class="col-xs-3 button">3</div>
          <div class="col-xs-3 button">+</div>
        </div>

        <div class="row">
          <div class="col-xs-3 button">.</div>
          <div class="col-xs-3 button">0</div>         
          <div class="col-xs-3 button">+-</div>
          <div class="col-xs-3 button">ENT</div>
        </div>
      </div>
    );
  }
}
