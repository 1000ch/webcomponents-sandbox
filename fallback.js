(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class AppDrawer extends HTMLElement {
  static get template() {
    return `
      <style>
        :host {
          position: fixed;
          display: block;
        }

        .drawer {
          display: flex;
          flex-direction: column;
          width: 240px;
          min-height: 100vh;
          overflow-y: scroll;
          padding: 10px;
          box-sizing: border-box;
          background-color: #fff;
        }

        .slide {
          transition-property: transform;
          transition-duration: 0.2s;
          transition-timing-function: ease;
        }

        @media (max-width: 960px) {
          :host([opened]) {
            top: 0;
            left: 0;
            bottom: 0;
          }

          :host .backdrop {
            width: 0;
            background-color: rgba(0, 0, 0, .5);
          }

          :host([opened]) .backdrop {
            width: 100vw;
          }

          :host .drawer {
            transform: translateX(-100%);
          }

          :host([opened]) .drawer {
            transform: translateX(0%);
          }
        }
      </style>

      <div class="backdrop">
        <div class="drawer slide">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['opened'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = AppDrawer.template;

    this.backdrop = this.shadowRoot.querySelector('.backdrop');
    this.drawer = this.shadowRoot.querySelector('.drawer');

    this.backdrop.addEventListener('click', e => {
      e.stopPropagation();

      if (!this.opened) {
        return;
      }

      this.opened = false;
    });

    this.drawer.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        return;
      }

      e.stopPropagation();
    });
  }

  emit(eventName) {
    this.dispatchEvent(new Event(eventName, {
      bubbles: true,
      composed: true
    }));
  }

  get opened() {
    return this.hasAttribute('opened');
  }

  set opened(value) {
    if (Boolean(value)) {
      this.setAttribute('opened', 'opened');
    } else {
      this.removeAttribute('opened');
      this.emit('close');
    }
  }
}exports.default = AppDrawer;
;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class AppHeader extends HTMLElement {
  static get template() {
    return `
      <style>
        :host {
          display: block;
        }

        header {
          display: flex;
          align-items: center;
          height: 64px;
          padding: 10px;
          box-sizing: border-box;
          background-color: #F50057;
          color: #fff;
        }
      </style>

      <header>
        <slot></slot>
      </header>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = AppHeader.template;
  }
}exports.default = AppHeader;
;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class AppLayout extends HTMLElement {
  static get template() {
    return `
      <style>
        :host {
          display: block;
          min-width: 100vw;
          min-height: 100vh;
        }

        div {
          margin-left: 240px;
        }

        @media (max-width: 960px) {
          div {
            margin-left: 0;
          }
        }
      </style>

      <slot id="drawer" name="drawer"></slot>

      <div>
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
    }).innerHTML = AppLayout.template;
  }
}exports.default = AppLayout;
;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class AppMain extends HTMLElement {
  static get template() {
    return `
      <style>
        :host {
          display: block;
        }

        main {
          padding: 10px;
        }
      </style>

      <main>
        <slot></slot>
      </main>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = AppMain.template;
  }
}exports.default = AppMain;
;

},{}],5:[function(require,module,exports){
'use strict';

var _appLayout = require('./app-layout.js');

var _appLayout2 = _interopRequireDefault(_appLayout);

var _appDrawer = require('./app-drawer.js');

var _appDrawer2 = _interopRequireDefault(_appDrawer);

var _appHeader = require('./app-header.js');

var _appHeader2 = _interopRequireDefault(_appHeader);

var _appMain = require('./app-main.js');

var _appMain2 = _interopRequireDefault(_appMain);

var _fancyButton = require('./fancy-button.js');

var _fancyButton2 = _interopRequireDefault(_fancyButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('app-layout', _appLayout2.default);
customElements.define('app-drawer', _appDrawer2.default);
customElements.define('app-header', _appHeader2.default);
customElements.define('app-main', _appMain2.default);
customElements.define('fancy-button', _fancyButton2.default);

const toggle = document.querySelector('#toggle');
const appDrawer = document.querySelector('app-drawer');
const appHeader = document.querySelector('app-header');
const appMain = document.querySelector('app-main');

if (document.documentElement.clientWidth <= 960) {
  appDrawer.inert = true;
} else {
  appDrawer.inert = false;
}

toggle.addEventListener('click', e => {
  e.stopPropagation();

  if (appDrawer.opened) {
    return;
  }

  appDrawer.opened = true;
  appDrawer.inert = false;
  appHeader.inert = true;
  appMain.inert = true;
});

appDrawer.addEventListener('close', e => {
  appDrawer.inert = true;
  appHeader.inert = false;
  appMain.inert = false;
});

},{"./app-drawer.js":1,"./app-header.js":2,"./app-layout.js":3,"./app-main.js":4,"./fancy-button.js":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class FancyButton extends HTMLElement {
  static get template() {
    return `
      <style>
        button {
          display: inline-flex;
          background: #0086b3;
          color: white;
          margin: 0.5em;
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

},{}]},{},[5]);
