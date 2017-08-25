(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeDialog extends HTMLElement {
    static get template() {
      return `
<style>
  #dialogmodal {
    position: absolute;
    border-radius: 3px;
    box-shadow:  0px 11px 15px -7px rgba(0, 0, 0, 0.2),
                  0px 24px 38px 3px rgba(0, 0, 0, 0.14),
                  0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    padding: 2rem;
    background-color: white;
    margin: auto;
    width: 40rem;
    height: 13rem;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  #entirescreen {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.1);
  }
</style>
<div id="entirescreen" style="display: none;"></div>
<div id="dialogmodal" style="display: none;">
  <slot name="question"></slot>
  <slot name="details"></slot>
  <slot name="message"></slot>
  <slot name="negative"></slot>
  <slot name="positive"></slot>
</div>
`
    }
    static get observedAttributes() {
      return ['display'];
    }
    get display() {
      return this.hasAttribute('display');
    }

    set display(val) {
      if (val) {
        this.setAttribute('display', '');
      } else {
        this.removeAttribute('display');
      }
    }
    attributeChangedCallback (atrValue, oldValue, newValue) {
      if (atrValue === 'display') {
        this.toggleDisplay();
        console.log('display toggled');
      }
    }
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    connectedCallback() {
      var entirescreen = this.shadowRoot.querySelector("#entirescreen");
      entirescreen.addEventListener('click', e => {
        console.log('entire screen clicked');
        this.removeAttribute('display');
      })
      var primBtn = this.querySelector(".primary");
      primBtn.addEventListener('click', e => {
        console.log('primary button clicked');
        reserveTheRoom();
      });
      var secoBtn = this.querySelector(".secondary");
      secoBtn.addEventListener('click', e => {
        console.log('secondary button clicked');
        this.removeAttribute('display');
      });
    }
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeDialog.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }

    toggleDisplay() {
      var dialogModal = this.shadowRoot.querySelector('#dialogmodal');
      var entirescreen = this.shadowRoot.querySelector('#entirescreen');
      if (this.display) {
        dialogModal.style.display = 'block';
        entirescreen.style.display = 'block';
      } else {
        dialogModal.style.display = 'none';
        entirescreen.style.display = 'none';
      }
    }
  } // Class DaubeDialog
  customElements.define('daube-dialog', DaubeDialog)
})();
