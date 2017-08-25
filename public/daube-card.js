(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeCard extends HTMLElement {
    static get observedAttributes() {}
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    static get template() {
      return`
<style>
  :host {
    display: block;
  }

  .card {
    max-width: 45rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 3px;
    padding: 1.25rem 2rem 4rem 2rem;
    margin: 0 auto;
    margin-top: 5rem;
    background-color: white;
  }
</style>
<div class="card">
  <slot></slot>
</div>
`
    }
    connectedCallback() {}
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeCard.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
  } // Class DaubeCard
  customElements.define('daube-card', DaubeCard)
})();