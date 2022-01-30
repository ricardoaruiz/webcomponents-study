import { Component, Host, h, State, Watch, Event } from '@stencil/core';
import { getSymbols } from './service';
export class RarStockFinder {
  constructor() {
    this.hasSearchSymbol = false;
    this.isLoadingData = false;
    this.error = null;
  }
  onSearchSymbleChange(newValue, oldValue) {
    if (newValue === oldValue)
      return;
    this.hasSearchSymbol = !!newValue;
    if (!this.hasSearchSymbol) {
      this.data = [];
      this.error = null;
    }
  }
  async onFindStocks(event) {
    try {
      event.preventDefault();
      this.error = null;
      this.isLoadingData = true;
      this.data = (await getSymbols(this.searchSymbol)).data;
    }
    catch (error) {
      this.error = error.message;
    }
    finally {
      this.isLoadingData = false;
    }
  }
  handleSearchSymbolChange(event) {
    this.searchSymbol = event.target.value;
  }
  handleSymbolSelected(symbol) {
    this.symbolSelected.emit(symbol);
  }
  renderResult() {
    var _a;
    if (this.isLoadingData) {
      return h("rar-spinner", null);
    }
    if (this.error) {
      return (h("p", null, this.error));
    }
    if (!this.error && !((_a = this.data) === null || _a === void 0 ? void 0 : _a.length)) {
      return (h("p", null, "No symbols to list"));
    }
    return (h("div", null,
      h("h2", null, "Results found"),
      h("ul", null, this.data.map(item => (h("li", { key: item.symbol, onClick: this.handleSymbolSelected.bind(this, item.symbol) },
        h("strong", null, item.symbol),
        " / ",
        h("small", null, item.name)))))));
  }
  render() {
    return (h(Host, null,
      h("h1", null, "Symbol Finder"),
      h("form", { onSubmit: this.onFindStocks.bind(this) },
        h("div", { class: "form-fields" },
          h("input", { id: "stock-symbol", placeholder: "Enter the symbol here", autoComplete: 'off', value: this.searchSymbol, onInput: this.handleSearchSymbolChange.bind(this) })),
        h("button", { type: "submit", disabled: !this.hasSearchSymbol || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Find')),
      this.renderResult()));
  }
  static get is() { return "rar-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["rar-stock-finder.css"]
  }; }
  static get styleUrls() { return {
    "$": ["rar-stock-finder.css"]
  }; }
  static get states() { return {
    "searchSymbol": {},
    "hasSearchSymbol": {},
    "data": {},
    "isLoadingData": {},
    "error": {}
  }; }
  static get events() { return [{
      "method": "symbolSelected",
      "name": "symbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
  static get watchers() { return [{
      "propName": "searchSymbol",
      "methodName": "onSearchSymbleChange"
    }]; }
}
