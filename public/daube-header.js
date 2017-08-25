(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeHeader extends HTMLElement {
    static get template() {
    return `
<style>
:host {
  display: block;
}
header {
  display: inline-block;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #cc0000;
  color: rgba(255,255,255,0.81);
  height: 3.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.maintitle {
  padding: 0.92rem 0rem 0.92rem 1.5rem;
  font-weight: 200;
  font-size: 1.66rem;
  height: 3.5rem;
}
</style>
<header>
  <div class="maintitle">Header</div>
  <slot></slot>
</header>
`
    }
    static get observedAttributes() {}
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    connectedCallback() {}
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeHeader.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
   } // Class DaubeInputText
  customElements.define("daube-header", DaubeHeader)
})();
