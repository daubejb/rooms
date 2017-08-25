(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class RoomsHome extends HTMLElement {
    static get template() {
      return `
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
<div id="home" style="display:none;">
  <daube-header id="daubeheader">
    <daube-user-icon></daube-user-icon>
  </daube-header>
  <daube-user-menu></daube-user-menu>
  <daube-dialog>
    <h3 slot="question">Reserve this room?</h3>d
    <p slot="details" id="details"></p>
    <p slot="message">Please tap reserve to confirm.</p>
    <button class="btn secondary" slot="negative">Cancel</button>
    <button class="btn primary" slot="positive">Reserve</button>
  </daube-dialog>
  <daube-card>
    <daube-table>
      <h2>Available rooms</h2>
      <p>To reserve a room, tap a checkbox</p>
      <br>
    </daube-table>
  </daube-card>
  <daube-snack>
    <div slot="message" class="message"><p id="message">Meeting room request sent</p></div>
  </daube-snack>
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
        handleAuthClick(e);
      });
      var body = document.querySelector('body');
      body.addEventListener('user-icon-clicked', e => {
        this.toggleUserMenu();
      });
      body.addEventListener('book-room-clicked', e => {
        var rawTimeSel = e.detail.path[0];
        console.log(rawTimeSel);
        var times = this.getDesiredTime(rawTimeSel);
        var sTime = new Date(times[0]).toString("hh:mm tt");
        var eTime = new Date(times[1]).toString("hh:mm tt");
        console.log('eTime: ', eTime);
        var resourceId = e.detail.path[1].id;
        sessionStorage.setItem('roomId', resourceId);

        console.log('raw id test: ', resourceId);
        var resourceName = e.detail.path[1].children[0].innerHTML;
        var details = this.shadowRoot.querySelector('#details');
        details.innerHTML = ('Name: ' + resourceName + '<br>' + 'Start: ' + sTime + '<br>' + 'End: ' + eTime);

        console.log('details: ', details);
        console.log('resource Name: ', resourceName);
        this.toggleDialog();
      })
    }
    getDesiredTime(rawTimeSel) {
      var now = new Date();
      var hour = now.getHours();
      var minutes = now.getMinutes();
      now.setSeconds(0);
      var stringTimeSel = rawTimeSel.className;
      console.log('string time sel: ', stringTimeSel);
      if (stringTimeSel.includes("nextthirty")) {
        if (minutes < 5) {
          now.setMinutes(0);
        } else if (minutes < 35) {
          now.setMinutes(30);
        } else if (minutes >= 35) {
          now.setMinutes(0);
          hour = hour + 1;
          now.setHours(hour);
        }
        var endTime = new Date(now.getTime());
        endTime.addMinutes(30);
        console.log('next thirty: ', now);
      } else if (stringTimeSel.includes("thishour")) {
        if (minutes < 15) {
          now.setMinutes(0);
        } else if (minutes < 45) {
          now.setMinutes(30);
        } else if (minutes >= 45) {
          now.setMinutes(0);
          hour = hour + 1;
          now.setHours(hour);
        }
        var endTime = new Date(now.getTime());
        endTime.addHours(1);
        console.log('thishour: ', now);
      } else if (stringTimeSel.includes("nexthour")) {
        if (minutes < 5) {
          now.setMinutes(0);
        } else if (minutes < 35) {
          now.setMinutes(30);
        } else if (minutes >= 35) {
          now.setMinutes(0);
          hour = hour + 1;
          now.setHours(hour);
        }
        var endTime = new Date(now.getTime());
        endTime.addHours(1);
        console.log('nexthour: ', now);
      } else {
        console.warn("Something went wrong, no desired time selected");
        return
      }
      var startTime = new Date(now.getTime());
      console.log('start time:', startTime);
      console.log('end time: ', endTime);
      var formatedStartTime = new Date(startTime.getTime()).toISOString();
      var formatedEndTime = new Date(endTime.getTime()).toISOString();
      sessionStorage.setItem('startTime', formatedStartTime);
      sessionStorage.setItem('endTime', formatedEndTime);
      var times = [startTime, endTime];
      return times
    }
    toggleDialog() {
      var daubeDialog = this.shadowRoot.querySelector('daube-dialog');
      if (daubeDialog.display) {
        daubeDialog.removeAttribute('display');
      } else {
        daubeDialog.setAttribute('display', '');
      }
    }
    toggleUserMenu() {
      var daubeUserMenu = this.shadowRoot.querySelector('daube-user-menu');
      if (daubeUserMenu.display) {
        daubeUserMenu.removeAttribute('display');
      } else {
        daubeUserMenu.setAttribute('display', '');
      }
    }
  } // Class RoomsHome
  customElements.define("rooms-home", RoomsHome);
})();