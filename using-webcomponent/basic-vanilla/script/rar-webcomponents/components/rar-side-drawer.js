import { HTMLElement, createEvent, h, proxyCustomElement } from '@stencil/core/internal/client';

const rarSideDrawerCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--backdrop-color, var(--_backdrop-color));z-index:var(--_layer-backrop);opacity:0;pointer-events:none;transition:opacity 0.4s ease-out}.backdrop.open{opacity:1;pointer-events:all}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;transition:left 0.4s ease-out;background-color:var(--background-color, var(--_background-color));box-shadow:var(--box-shadow, var(--_box-shadow));z-index:var(--_layer-base)}aside.open{left:0}header{display:flex;justify-content:space-between;align-items:center;height:4rem;padding:0 1rem;background-color:var(--primary-color, var(--_primary-color));color:var(--_white)}header h1{font-size:1.5rem;margin:0}header button{cursor:pointer;border:0;background-color:transparent;font-size:1.5rem;font-weight:500;color:var(--_white);align-self:stretch;padding:0 0.5rem}.tabs{display:flex;justify-content:center;align-items:center;margin:1rem 0}.tabs button{width:30%;padding:0.25rem 0;cursor:pointer;transition:all 0.3s ease-out}.tabs button{font-size:1rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse))}.tabs button:hover{background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tabs button.active{cursor:default;background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tab{visibility:hidden;opacity:0;height:0;transition:opacity 0.3s ease-out}.tab.active{visibility:visible;opacity:1;height:auto}";

const tabs = {
  navigation: 'navigation',
  contact: 'contact'
};
let SideDrawer = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.closeDrawer = createEvent(this, "closeDrawer", 7);
    this.activeTab = tabs.navigation;
  }
  onOpenChange() {
    this.opened && this.drawerRef.focus();
  }
  handleClose() {
    console.log('internal closing...');
    this.closeDrawer.emit();
  }
  handleChangeActiveTab(activeTab) {
    this.activeTab = activeTab;
  }
  getActiveClass(activeTabe) {
    return this.activeTab === activeTabe ? 'active' : '';
  }
  onDrwawerKeyDown(event) {
    event.key === 'Escape' && this.handleClose();
  }
  render() {
    return [
      h("div", { class: `backdrop ${this.opened ? 'open' : ''}`, onClick: this.handleClose.bind(this), tabindex: "0" }),
      h("aside", { class: this.opened ? 'open' : '', ref: (el) => this.drawerRef = el, onKeyDown: this.onDrwawerKeyDown.bind(this), tabindex: "1" }, h("header", null, h("h1", null, this.title), h("button", { type: "button", onClick: this.handleClose.bind(this) }, "X")), h("section", { class: "tabs" }, h("button", { class: this.getActiveClass(tabs.navigation), onClick: this.handleChangeActiveTab.bind(this, tabs.navigation) }, "Navigation"), h("button", { class: this.getActiveClass(tabs.contact), onClick: this.handleChangeActiveTab.bind(this, tabs.contact) }, "Contact")), h("section", { class: `tab ${this.getActiveClass(tabs.navigation)}` }, h("slot", { name: tabs.navigation })), h("section", { class: `tab ${this.getActiveClass(tabs.contact)}` }, h("slot", { name: tabs.contact })))
    ];
  }
  static get watchers() { return {
    "opened": ["onOpenChange"]
  }; }
  static get style() { return rarSideDrawerCss; }
};
SideDrawer = /*@__PURE__*/ proxyCustomElement(SideDrawer, [1, "rar-side-drawer", {
    "title": [513],
    "opened": [516],
    "activeTab": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["rar-side-drawer"];
  components.forEach(tagName => { switch (tagName) {
    case "rar-side-drawer":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SideDrawer);
      }
      break;
  } });
}

const RarSideDrawer = SideDrawer;
const defineCustomElement = defineCustomElement$1;

export { RarSideDrawer, defineCustomElement };
