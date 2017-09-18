export default class AppMain extends HTMLElement {
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
};
