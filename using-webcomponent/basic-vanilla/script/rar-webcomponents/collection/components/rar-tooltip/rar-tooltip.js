import { Component, Host, h, Prop } from '@stencil/core';
export class RarTooltip {
  constructor() {
    this.opened = false;
  }
  onOpen() {
    this.opened = true;
    this.tooltipIconRef.focus();
  }
  onClose(event) {
    event === null || event === void 0 ? void 0 : event.stopPropagation();
    this.opened = false;
  }
  onTooltipTextKeyDown(event) {
    event.key === 'Escape' && this.onClose();
  }
  render() {
    return (h(Host, null,
      h("div", { tabIndex: 0, class: 'tootlip_backdrop', onClick: this.onClose.bind(this) }),
      h("slot", null),
      h("span", { tabIndex: 1, class: "tooltip_icon", onClick: this.onOpen.bind(this), onKeyDown: this.onTooltipTextKeyDown.bind(this), ref: (el) => this.tooltipIconRef = el },
        "?",
        h("div", { tabIndex: 1, class: 'tootlip_text', "aria-label": this.text, onClick: this.onClose.bind(this) }, this.text))));
  }
  static get is() { return "rar-tooltip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["rar-tooltip.css"]
  }; }
  static get styleUrls() { return {
    "$": ["rar-tooltip.css"]
  }; }
  static get properties() { return {
    "opened": {
      "type": "boolean",
      "mutable": true,
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
      "reflect": true,
      "defaultValue": "false"
    },
    "text": {
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
      "attribute": "text",
      "reflect": false
    }
  }; }
}
