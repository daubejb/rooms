(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeSnack extends HTMLElement {
    static get template() {
      return `
<style>
:host { font-size: 1rem; }
#snack {
  display: block;
  position: fixed;
  bottom: -3rem;
  z-index: 3;
  left: 50%;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 0;
  margin-left: -10.5rem;
  background-color: rgb(50,50,50);
  border-radius: 2px;
  min-width: 18rem;
  max-width: 18rem;
  height: 3rem;
  line-height: 1.15rem;
  padding: 0 1.5rem 0 1.5rem;
  transition: bottom 0.35s ease-in-out;
}
#snack.display {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.87);
  bottom: 0rem;
  color: rgba
}
#message p {
  font-weight: 200;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.87);
  padding-top: 0.5rem;
  padding-left: 1.5rem;
  vertical-align: middle;
}
</style>
<div id="snack">
  <slot name="message" id="message"></slot>
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
        console.log('display toggled');
        this.toggleDisplay();
      }
    }
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
      var snack = this.getSnackView();
    }
    connectedCallback() {}
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeSnack.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
    toggleDisplay() {
      var snack = this.getSnackView();
      if (this.display) {
        snack.className = "display";
      }
      setTimeout(function(){ snack.className = snack.className.replace("display", ""); }, 5000);
    }

    getSnackView() {
      var snack = this.shadowRoot.querySelector('#snack');
      return snack;
    }
  } // Class DaubeInputText
  customElements.define('daube-snack', DaubeSnack)
})();