import { Component, h, Prop, State, Event, Watch } from '@stencil/core';
const tabs = {
  navigation: 'navigation',
  contact: 'contact'
};
export class SideDrawer {
  constructor() {
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
      h("aside", { class: this.opened ? 'open' : '', ref: (el) => this.drawerRef = el, onKeyDown: this.onDrwawerKeyDown.bind(this), tabindex: "1" },
        h("header", null,
          h("h1", null, this.title),
          h("button", { type: "button", onClick: this.handleClose.bind(this) }, "X")),
        h("section", { class: "tabs" },
          h("button", { class: this.getActiveClass(tabs.navigation), onClick: this.handleChangeActiveTab.bind(this, tabs.navigation) }, "Navigation"),
          h("button", { class: this.getActiveClass(tabs.contact), onClick: this.handleChangeActiveTab.bind(this, tabs.contact) }, "Contact")),
        h("section", { class: `tab ${this.getActiveClass(tabs.navigation)}` },
          h("slot", { name: tabs.navigation })),
        h("section", { class: `tab ${this.getActiveClass(tabs.contact)}` },
          h("slot", { name: tabs.contact })))
    ];
  }
  static get is() { return "rar-side-drawer"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["rar-side-drawer.css"]
  }; }
  static get styleUrls() { return {
    "$": ["rar-side-drawer.css"]
  }; }
  static get properties() { return {
    "title": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "title",
      "reflect": true
    },
    "opened": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "opened",
      "reflect": true
    }
  }; }
  static get states() { return {
    "activeTab": {}
  }; }
  static get events() { return [{
      "method": "closeDrawer",
      "name": "closeDrawer",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get watchers() { return [{
      "propName": "opened",
      "methodName": "onOpenChange"
    }]; }
}
