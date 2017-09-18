export default class AppLayout extends HTMLElement {
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
};
