(function() {
  let thisImportDoc = document.currentScript.ownerDocument;
  class DaubeTable extends HTMLElement {
    static get observedAttributes() {}
    constructor() {
      super();
      var shadowRoot = this.initShadowDom();
    }
    static get template() {
      return `
<style>
:host { font-size: 1rem; }
table {
  width: 100%;
}
thead tr th {
  font-size: 0.95rem;
  color: rgba(0,0,0,0.54);
}
tbody tr:hover{
  background-color: rgba(0,0,0,0.05);
}
tbody tr td, .bookroom {
  border-top: 1px solid rgba(0,0,0,0.2);
  color: rgba(0,0,0,0.87);
  text-align: center;
  padding-top: .35rem;
  padding-bottom: .3rem;
}

.bookroom {
  font-size: 2rem;
}
.bookroom:hover {
  cursor: pointer;
  color: #cc0000;
  font-size: 2rem;
  font-weight: 900;
}
.alignleft {
  text-align: left;
}


tbody tr td.no {
  color: rgba(0,0,0,0.25);
}
</style>
<slot></slot>
<table>
<thead>
  <tr>
    <th class="alignleft">Name</th>
    <th>This hour</th>
    <th>Next 30 minutes</th>
    <th>Next hour</th>
  </tr>
</thead>
<tbody>
  <tr id="redhat.com_72616c656967682d31346e3333302d6f7065726174696f6e2d382d702d6578514a506237454a@resource.calendar.google.com">
    <td class="alignleft">14n330-operation-8-p</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour no">—</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134733230302d7363726162626c652d382d702d44787776584d4b4444@resource.calendar.google.com">
    <td class="alignleft">14s200-scrabble-8-p</td>
    <td class="thishour no">—</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour bookroom">▢</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134733333302d736861646f776d616e2d31362d702d62736d647668486652@resource.calendar.google.com">
    <td class="alignleft">14s330-shadowman-16-p</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty no">—</td>
    <td class="nexthour no">—</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134773130322d7269736b2d382d702d645a354d7976414f56@resource.calendar.google.com">
    <td class="alignleft">14w102-risk-8-vc</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour no">—</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134773130362d6d6f6e6f706f6c792d382d702d3363486c6d53395a4b@resource.calendar.google.com">
    <td class="alignleft">14w106-monopoly-8-p</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour no">—</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134773430322d747769737465722d362d702d43764d7a4c634d5759@resource.calendar.google.com">
    <td class="alignleft">14w402-twister-6-p</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour no">—</td>
  </tr>
  <tr id="redhat.com_72616c656967682d3134773430362d626174746c65736869702d382d702d3771425863647a474a@resource.calendar.google.com">
    <td class="alignleft">14w406-battleship-8-p</td>
    <td class="thishour bookroom">▢</td>
    <td class="nextthirty bookroom">▢</td>
    <td class="nexthour no">—</td>
  </tr>
</tbody>
</table>
`
    }
    connectedCallback() {
      this.shadowRoot.addEventListener('click', e => {
        this.bookRoom(e);
      });
    }
    bookRoom(e) {
      console.log('book room event dispatched');
      var tag = e.target;
      var compPath = e.composedPath();
      console.log(compPath);
      tag.dispatchEvent(new CustomEvent('book-room-clicked', {
        detail: {
          path: compPath
        },
        bubbles: true,
        composed: true}));
    }
    initShadowDom() {
      let shadowRoot = this.attachShadow({mode: 'open'});
      let tmpl = DaubeTable.template;
      shadowRoot.innerHTML = tmpl;
      return shadowRoot;
    }
  } // Class DaubeInputText
  customElements.define('daube-table', DaubeTable)
})();
