(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeUserMenu extends HTMLElement {
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
    }
    static get template() {
      return`
<style>
  #usermenu {
    position: fixed;
    top: 3.66rem;
    right: 2rem;
    background-color: white;
    min-width: 10rem;
    width: 22rem;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    padding: 0rem;
    z-index: 2;
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
    right: 1.25rem;
    margin: 0.625rem 1.25rem;
    float: right;
  }
  .btn:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  #displayname {
    color: black;
    display: block;
    text-align: left;
    font-weight: 600;
  }
  #emailaddress {
    color: #474448;
    display: block;
    text-align: left;
  }
  #userdetails {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    top: 2.5rem;
  }
  #largeavatar {
    display: inline-block;
    border-radius: 50%;
    height: 6rem;
    width: 6rem;
  }
  #topsection {
    display: block;
    white-space: nowrap;
    margin: 1.25rem;
  }
  #bottomsection {
    display: block;
    border-top: 1px solid grey;
    width: 100%;
    background-color: whitesmoke;
  }
  #userphoto {
    display: inline-block !important;
    padding-right: 1.25rem;
    height: 6rem;
    width: 6rem;
  }
  #entirescreen {
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
  }
  </style>
<div id="entirescreen" style="display: none;"></div>
<div id="usermenu" style="display: none;">
  <div id="topsection">
    <div id="userphoto">
      <img src="../images/user_avatar.png" alt="" id="largeavatar">
    </div>
    <div id="userdetails">
      <div id="displayname">Jeffrey B. Daube</div>
      <div id="emailaddress">daubejb@gmail.com</div>
    </div>
  </div>
  <div class="bottomsection">
    <button class="btn" id="googlelogout">Sign out</button>
  </div>
</div>
`
    }
    connectedCallback() {
      console.log('daube-user-menu connected to page');
      var shadowRoot = this.initShadowDom();

      // handle entire screen click to close user menu
      var entirescreen = shadowRoot.querySelector("#entirescreen")
      entirescreen.addEventListener("click", e => {
        console.log('entire screen clicked');
        this.removeAttribute('display');
      });

      // handle logout button, toggle to login screen
      var googlelogout = shadowRoot.querySelector("#googlelogout");
      googlelogout.addEventListener("click", e => {
        console.log('logout button clicked');
        handleSignoutClick(e);
        window.location.reload();
      });

    }

    //toggle display based on if user menu is shown or not
    toggleDisplay() {
      var usermenu = this.getUserMenu();
      var entirescreen = this.getEntireScreen();
      if (this.display) {
        usermenu.style.display = 'block';
        entirescreen.style.display = 'block';
      } else {
        usermenu.style.display = 'none';
        entirescreen.style.display = 'none';
      }
    }
    getUserMenu() {
      return this.shadowRoot.querySelector('#usermenu');
    }
    getEntireScreen() {
      return this.shadowRoot.querySelector('#entirescreen');
    }
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeUserMenu.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
  } // Class DaubeUserMenu
  customElements.define('daube-user-menu', DaubeUserMenu)
})();