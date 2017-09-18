export default class ButtonIndigo extends HTMLElement {
  static get template() {
    return `
      <style>
        button {
          display: inline-flex;
          background: #3f51b5;
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
    }).innerHTML = ButtonIndigo.template;
  }
};
