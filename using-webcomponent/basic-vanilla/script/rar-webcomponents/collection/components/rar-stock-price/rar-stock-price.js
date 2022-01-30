import { Component, h, State, Watch, Prop, Listen } from '@stencil/core';
import { getStockData } from './service';
export class RarStockPrice {
  constructor() {
    this.isLoadingData = false;
    this.error = null;
  }
  onSymbolPropChange(newValue, oldValue) {
    if (newValue === oldValue)
      return;
    this.stockSymbolInput = newValue;
    this.fetchData(newValue);
  }
  onStockSymbolInputChange(newValue, oldValue) {
    if (newValue === oldValue)
      return;
    this.hasStockSymbolInput = !!newValue;
    if (!this.hasStockSymbolInput) {
      this.data = null;
    }
  }
  onStockSelectedHandler(event) {
    this.stockSymbolProp = event.detail;
  }
  async onSubmitForm(event) {
    event.preventDefault();
    if (!this.stockSymbolInput)
      return;
    this.fetchData(this.stockSymbolInput);
  }
  onStockSymbolInput(event) {
    this.stockSymbolInput = event.target.value;
  }
  async fetchData(symbol) {
    try {
      this.error = null;
      this.isLoadingData = true;
      const stockData = await getStockData(symbol);
      this.data = stockData;
    }
    catch (error) {
      this.error = error.message;
      this.data = null;
    }
    finally {
      this.isLoadingData = false;
    }
  }
  componentWillLoad() {
    if (this.stockSymbolProp) {
      this.stockSymbolInput = this.stockSymbolProp;
      return this.fetchData(this.stockSymbolProp);
    }
  }
  hostData() {
    return {
      class: this.error && 'error'
    };
  }
  renderResult() {
    if (this.isLoadingData) {
      return h("rar-spinner", null);
    }
    if (!this.hasStockSymbolInput && !this.data) {
      return h("p", null, "No symbol have been entered");
    }
    if (this.hasStockSymbolInput && !this.error) {
      return h("p", null,
        "Price: ",
        this.data && this.data.price);
    }
    if (this.error) {
      return h("p", null, this.error);
    }
  }
  render() {
    return [
      h("h1", null, "Stock Price"),
      h("form", { onSubmit: this.onSubmitForm.bind(this) },
        h("div", { class: "form-fields" },
          h("input", { id: "stock-symbol", value: this.stockSymbolInput, placeholder: "Enter the symbol here", autoComplete: 'off', onInput: this.onStockSymbolInput.bind(this) }),
          h("rar-tooltip", { text: "Enter a symbol in the field and press the button to recevie then information. Example: IBM, MSFT, AAPL" })),
        h("button", { type: "submit", disabled: !this.hasStockSymbolInput || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Fetch')),
      h("div", null, this.renderResult())
    ];
  }
  static get is() { return "rar-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["rar-stock-price.css"]
  }; }
  static get styleUrls() { return {
    "$": ["rar-stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbolProp": {
      "type": "string",
      "mutable": true,
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
      "attribute": "symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "stockSymbolInput": {},
    "hasStockSymbolInput": {},
    "isLoadingData": {},
    "data": {},
    "error": {}
  }; }
  static get watchers() { return [{
      "propName": "stockSymbolProp",
      "methodName": "onSymbolPropChange"
    }, {
      "propName": "stockSymbolInput",
      "methodName": "onStockSymbolInputChange"
    }]; }
  static get listeners() { return [{
      "name": "symbolSelected",
      "method": "onStockSelectedHandler",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
