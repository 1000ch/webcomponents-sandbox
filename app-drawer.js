export default class AppDrawer extends HTMLElement {
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
    return [
      'opened'
    ];
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
};
