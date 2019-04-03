import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {UALJs} from 'ual-plainjs-renderer'
import {Scatter} from 'ual-scatter'
import {Lynx} from 'ual-lynx'

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
      ual: {
        type: Object,
        notify: true,
        reflectToAttribute: true,
      },
      users: {
        type: Array,
        notify: true,
        reflectToAttribute: true,
      },
      chainId: {
        type: String,
      },
      chainProtocol: {
        type: String,
      },
      chainHost: {
        type: String,
      },
      chainPort: {
        type: String,
      },
      appName: {
        type: String,
      },
      scatter: {
        type: Boolean,
        value: false,
        observer: '_init'
      },
      lynx: {
        type: Boolean,
        value: false,
        observer: '_init'
      },
      renderId: {
        type: String,
      }
    };
  }
  _init() {
    if(this.chainId && this.chainProtocol && this.chainHost && this.chainPort) {
      const myCallback = arrayOfUsers => {
        this.users = arrayOfUsers;
      }
      const myChain = {
        chainId: this.chainId,
        rpcEndpoints: [{
          protocol: this.chainProtocol,
          host: this.chainHost,
          port: this.chainPort,
        }]
      }
      const myAppName = this.appName
      const scatter = new Scatter([myChain], { appName: myAppName })
      const lynx = new Lynx([myChain], { appName: myAppName })
      
      const myAppRoot = {
        containerElement: document.getElementById(this.renderId)
      }
      
      this.ual = new UALJs(myCallback, [myChain], myAppName, [scatter, lynx], myAppRoot)
      this.ual.init()
    }
  }
  _logout() {
    this.ual.logoutUser()
  }
} window.customElements.define('eos-ual', EosUal);
