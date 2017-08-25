(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeUserIcon extends HTMLElement {
    static get observedAttributes() {}
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    static get template() {
      return `
<style>
    #usericon {
      padding-right: 1.5rem;
      float: right;
      border-radius: 50%;
      position: fixed;
      right: 0rem;
      top: 0.66rem;
      width: 2.25rem;
      height: 2.25rem;
      vertical-align: middle;
      z-index: 2;
    }
    #avatar {
      display: block;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      cursor: pointer;
      z-index: 2;
    }
</style>
<div id="usericon">
  <img id="avatar" src="../images/user_avatar.png">
</div>
`
    }
    connectedCallback() {
      var usericon = this.shadowRoot.querySelector('#avatar');
      usericon.addEventListener('click', this.onClick);

    }
    onClick(e) {
      this.dispatchEvent(new CustomEvent('user-icon-clicked',
        {bubbles: true, composed: true}));
        console.log('user icon on click event dispatched');
    }
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeUserIcon.template;
      shadowRoot.innerHTML = tmpl;
      console.log('daube user icon appended to document');
      return shadowRoot;
    }
  } // Class DaubeInputText
  customElements.define('daube-user-icon', DaubeUserIcon)
})();