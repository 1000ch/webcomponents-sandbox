import AppLayout from './src/app-layout.js';
import AppDrawer from './src/app-drawer.js';
import AppHeader from './src/app-header.js';
import AppMain from './src/app-main.js';
import FancyButton from './fancy-button.js';
import './src/button/index.js';

customElements.define('app-layout', AppLayout);
customElements.define('app-drawer', AppDrawer);
customElements.define('app-header', AppHeader);
customElements.define('app-main', AppMain);
customElements.define('fancy-button', FancyButton);

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
