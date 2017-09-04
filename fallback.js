(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _fancyButton = require('./fancy-button.js');

var _fancyButton2 = _interopRequireDefault(_fancyButton);

var _fancyDivButton = require('./fancy-div-button.js');

var _fancyDivButton2 = _interopRequireDefault(_fancyDivButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('fancy-button', _fancyButton2.default);
customElements.define('fancy-div-button', _fancyDivButton2.default);

},{"./fancy-button.js":2,"./fancy-div-button.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class FancyButton extends HTMLElement {
  static get template() {
    return `
      <style>
        button {
          display: inline-block;
          background: tomato;
          color: white;
          padding: 1em;
          font-size: 16px;
          font-family: sans-serif;
          font-weight: bold;
          border-radius: 0.5em;
          cursor: pointer;
          border: none;
        }
      </style>
      <button>
        <slot></slot>
      </button>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = FancyButton.template;
  }
}exports.default = FancyButton;
;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class FancyDivButton extends HTMLElement {
  static get template() {
    return `
      <style>
        div {
          display: inline-block;
          background: tomato;
          color: white;
          padding: 1em;
          font-size: 16px;
          font-family: sans-serif;
          font-weight: bold;
          border-radius: 0.5em;
          cursor: pointer;
          border: none;
        }
      </style>
      <div tabindex="0" role="button">
        <slot></slot>
      </div>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = FancyDivButton.template;
  }
}exports.default = FancyDivButton;
;

},{}]},{},[1]);
