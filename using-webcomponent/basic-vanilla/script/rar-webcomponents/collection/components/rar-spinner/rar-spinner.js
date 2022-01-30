import { Component, h } from '@stencil/core';
export class RarSpinner {
  render() {
    return (h("div", { class: "loader" }));
  }
  static get is() { return "rar-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["rar-spinner.css"]
  }; }
  static get styleUrls() { return {
    "$": ["rar-spinner.css"]
  }; }
}
