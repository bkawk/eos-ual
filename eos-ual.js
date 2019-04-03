import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `eos-ual`
 * Web Component for EOS Universal Authenticator Library
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EosUal extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'eos-ual',
      },
    };
  }
}

window.customElements.define('eos-ual', EosUal);
