(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class RoomsHome extends HTMLElement {
    static get template() {
      return `
<script src="main.js"></script>
<style>
:host {
  display: block;
}
.header {
  height: 350px;
  overflow: hidden;
}
h1 {
  letter-spacing: 2px;
  font-weight: 500;
}
p {
  font-weight: 300;
  font-size: 18px;
}
.maintitle {
  font-size: 4.2em;
  color: #cc0000;
}
.footer {
  font-size: 13px;
}
a:link, a:visited {
  color: #cc0000;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.signin-view {
  padding-top: 10%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  display: block;
}
.btn {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border-color: #cc0000;
    border-radius: 2px;
    height: 2.25rem;
    background-color: #cc0000;
    color: white;
    cursor: pointer;
    margin: 0.5rem;
}
.btn:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
button.secondary {
  background-color: #585858;
  border-color: #585858;
  float: right;
}
button.primary {
  float: right;
}
</style>

<div class="signin-view" id="signin">
  <div class="header">
      <div class="maintitle">Rooms</div>
      <p role="main">A way to quickly grab a room for a meeting</p>
      <br/>
      <button id="googlelogin" class="btn">Sign in with Google</button>
  </div>
  <p class="footer">Created by <a href="https://twitter.com/jeffdaube">Jeffrey B. Daube</a>.
  Find this on <a href="https://github.com/daubejb/attic">GitHub</a>.</p>
</div>
`
    }
    static get observedAttributes() {}
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = RoomsHome.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
    connectedCallback() {
      var googlelogin = this.shadowRoot.querySelector("#googlelogin");
      googlelogin.addEventListener("click", e => {
        console.log('login with google button clicked');
        this.googleLogin();
      });
    }

  } // Class RoomsHome
  customElements.define("rooms-home", RoomsHome);
})();