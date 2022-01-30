import { HTMLElement, createEvent, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { A as ALPHAVANTAGE_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './rar-spinner2.js';

const AV_BASE_URL = 'https://www.alphavantage.co';
const getSymbols = async (serchedSymbol) => {
  const response = await fetch(`${AV_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${serchedSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
  const data = await response.json();
  if (data['Information']) {
    throw new Error('Exceeded calls, try later...');
  }
  if (!data.bestMatches.length) {
    return {
      data: []
    };
  }
  const stockData = {
    data: data.bestMatches.map(item => ({
      symbol: item["1. symbol"],
      name: item["2. name"]
    }))
  };
  return stockData;
};

const rarStockFinderCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:block;font-family:sans-serif;padding:1rem;border-radius:0.5rem;box-shadow:var(--box-shadow, var(--_box-shadow));background-color:var(--_white);color:var(--_black);max-width:400px}form{display:flex;flex-direction:column}.form-fields{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}form input{flex:1;width:100%;font:inherit;color:var(--primary-color, var(--_primary-color));padding:0.5rem;outline:none;border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem;margin-right:0.5rem}form input::placeholder{color:var(--primary-color, var(--_primary-color))}form button{font:inherit;padding:0.25rem 0.5rem;border-radius:0.25rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_white));cursor:pointer;outline:none;align-self:flex-end;min-width:8rem}form button:hover,form button:active{background-color:var(--second-color, var(--_second-color));border:1px solid var(--second-color, var(--_second-color))}form button:disabled{background-color:var(--primary-color, var(--_primary-color));opacity:0.5;cursor:default}ul{margin:0;padding:0;list-style:none;max-height:15rem;overflow-y:auto}li{margin:0.25rem 0;padding:0.4rem;color:var(--primary-color, var(--_primary-color));border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem}li:hover{background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_black));color:var(--_white);cursor:pointer}";

let RarStockFinder$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.symbolSelected = createEvent(this, "symbolSelected", 7);
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
    return (h("div", null, h("h2", null, "Results found"), h("ul", null, this.data.map(item => (h("li", { key: item.symbol, onClick: this.handleSymbolSelected.bind(this, item.symbol) }, h("strong", null, item.symbol), " / ", h("small", null, item.name)))))));
  }
  render() {
    return (h(Host, null, h("h1", null, "Symbol Finder"), h("form", { onSubmit: this.onFindStocks.bind(this) }, h("div", { class: "form-fields" }, h("input", { id: "stock-symbol", placeholder: "Enter the symbol here", autoComplete: 'off', value: this.searchSymbol, onInput: this.handleSearchSymbolChange.bind(this) })), h("button", { type: "submit", disabled: !this.hasSearchSymbol || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Find')), this.renderResult()));
  }
  static get watchers() { return {
    "searchSymbol": ["onSearchSymbleChange"]
  }; }
  static get style() { return rarStockFinderCss; }
};
RarStockFinder$1 = /*@__PURE__*/ proxyCustomElement(RarStockFinder$1, [1, "rar-stock-finder", {
    "searchSymbol": [32],
    "hasSearchSymbol": [32],
    "data": [32],
    "isLoadingData": [32],
    "error": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["rar-stock-finder", "rar-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "rar-stock-finder":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RarStockFinder$1);
      }
      break;
    case "rar-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const RarStockFinder = RarStockFinder$1;
const defineCustomElement = defineCustomElement$1;

export { RarStockFinder, defineCustomElement };
