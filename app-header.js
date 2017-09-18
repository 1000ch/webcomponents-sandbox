export default class AppHeader extends HTMLElement {
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
};
