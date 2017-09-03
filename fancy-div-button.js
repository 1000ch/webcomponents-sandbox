export default class FancyDivButton extends HTMLElement {
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
};
