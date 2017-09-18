export default class ButtonPink extends HTMLElement {
  static get template() {
    return `
      <style>
        button {
          display: inline-flex;
          background: #e91e63;
          color: #fff;
          margin: 0.5em;
          padding: 1em;
          font-size: 16px;
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
    }).innerHTML = ButtonPink.template;
  }
};
