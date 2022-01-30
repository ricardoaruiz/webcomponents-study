import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { A as ALPHAVANTAGE_API_KEY } from './global.js';
import { d as defineCustomElement$3 } from './rar-spinner2.js';
import { d as defineCustomElement$2 } from './rar-tooltip2.js';

const AV_BASE_URL = 'https://www.alphavantage.co';
const getStockData = async (stockSymbol) => {
  const response = await fetch(`${AV_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
  const data = await response.json();
  if (data['Note']) {
    throw new Error('Exceeded calls, try later...');
  }
  if (!data['Global Quote']['01. symbol']) {
    throw new Error('Invalid Symbol. Try another one.');
  }
  const { 'Global Quote': { "01. symbol": symbol, "05. price": price } } = data;
  const stockData = {
    symbol,
    price: +price
  };
  return stockData;
};

const rarStockPriceCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:block;font-family:sans-serif;padding:1rem;border-radius:0.5rem;box-shadow:var(--box-shadow, var(--_box-shadow));background-color:var(--_white);color:var(--_black);max-width:400px}:host(.error){box-shadow:var(--box-shadow-error, var(--_box-shadow-error))}form{display:flex;flex-direction:column}.form-fields{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}form input{flex:1;width:100%;font:inherit;color:var(--primary-color, var(--_primary-color));padding:0.5rem;outline:none;border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem;margin-right:0.5rem}form input::placeholder{color:var(--primary-color, var(--_primary-color))}form button{font:inherit;padding:0.25rem 0.5rem;border-radius:0.25rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_white));cursor:pointer;outline:none;align-self:flex-end;min-width:8rem}form button:hover,form button:active{background-color:var(--second-color, var(--_second-color));border:1px solid var(--second-color, var(--_second-color))}form button:disabled{background-color:var(--primary-color, var(--_primary-color));opacity:0.5;cursor:default}";

let RarStockPrice$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
      return h("p", null, "Price: ", this.data && this.data.price);
    }
    if (this.error) {
      return h("p", null, this.error);
    }
  }
  __stencil_render() {
    return [
      h("h1", null, "Stock Price"),
      h("form", { onSubmit: this.onSubmitForm.bind(this) }, h("div", { class: "form-fields" }, h("input", { id: "stock-symbol", value: this.stockSymbolInput, placeholder: "Enter the symbol here", autoComplete: 'off', onInput: this.onStockSymbolInput.bind(this) }), h("rar-tooltip", { text: "Enter a symbol in the field and press the button to recevie then information. Example: IBM, MSFT, AAPL" })), h("button", { type: "submit", disabled: !this.hasStockSymbolInput || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Fetch')),
      h("div", null, this.renderResult())
    ];
  }
  static get watchers() { return {
    "stockSymbolProp": ["onSymbolPropChange"],
    "stockSymbolInput": ["onStockSymbolInputChange"]
  }; }
  static get style() { return rarStockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
RarStockPrice$1 = /*@__PURE__*/ proxyCustomElement(RarStockPrice$1, [1, "rar-stock-price", {
    "stockSymbolProp": [1537, "symbol"],
    "stockSymbolInput": [32],
    "hasStockSymbolInput": [32],
    "isLoadingData": [32],
    "data": [32],
    "error": [32]
  }, [[16, "symbolSelected", "onStockSelectedHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["rar-stock-price", "rar-spinner", "rar-tooltip"];
  components.forEach(tagName => { switch (tagName) {
    case "rar-stock-price":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RarStockPrice$1);
      }
      break;
    case "rar-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "rar-tooltip":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const RarStockPrice = RarStockPrice$1;
const defineCustomElement = defineCustomElement$1;

export { RarStockPrice, defineCustomElement };
