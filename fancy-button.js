export default class FancyButton extends HTMLElement {
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
};
