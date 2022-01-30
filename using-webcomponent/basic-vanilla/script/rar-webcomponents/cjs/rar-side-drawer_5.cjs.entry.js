'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d2ebd7a3.js');

const rarSideDrawerCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--backdrop-color, var(--_backdrop-color));z-index:var(--_layer-backrop);opacity:0;pointer-events:none;transition:opacity 0.4s ease-out}.backdrop.open{opacity:1;pointer-events:all}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;transition:left 0.4s ease-out;background-color:var(--background-color, var(--_background-color));box-shadow:var(--box-shadow, var(--_box-shadow));z-index:var(--_layer-base)}aside.open{left:0}header{display:flex;justify-content:space-between;align-items:center;height:4rem;padding:0 1rem;background-color:var(--primary-color, var(--_primary-color));color:var(--_white)}header h1{font-size:1.5rem;margin:0}header button{cursor:pointer;border:0;background-color:transparent;font-size:1.5rem;font-weight:500;color:var(--_white);align-self:stretch;padding:0 0.5rem}.tabs{display:flex;justify-content:center;align-items:center;margin:1rem 0}.tabs button{width:30%;padding:0.25rem 0;cursor:pointer;transition:all 0.3s ease-out}.tabs button{font-size:1rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse))}.tabs button:hover{background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tabs button.active{cursor:default;background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tab{visibility:hidden;opacity:0;height:0;transition:opacity 0.3s ease-out}.tab.active{visibility:visible;opacity:1;height:auto}";

const tabs = {
  navigation: 'navigation',
  contact: 'contact'
};
let SideDrawer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeDrawer = index.createEvent(this, "closeDrawer", 7);
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
      index.h("div", { class: `backdrop ${this.opened ? 'open' : ''}`, onClick: this.handleClose.bind(this), tabindex: "0" }),
      index.h("aside", { class: this.opened ? 'open' : '', ref: (el) => this.drawerRef = el, onKeyDown: this.onDrwawerKeyDown.bind(this), tabindex: "1" }, index.h("header", null, index.h("h1", null, this.title), index.h("button", { type: "button", onClick: this.handleClose.bind(this) }, "X")), index.h("section", { class: "tabs" }, index.h("button", { class: this.getActiveClass(tabs.navigation), onClick: this.handleChangeActiveTab.bind(this, tabs.navigation) }, "Navigation"), index.h("button", { class: this.getActiveClass(tabs.contact), onClick: this.handleChangeActiveTab.bind(this, tabs.contact) }, "Contact")), index.h("section", { class: `tab ${this.getActiveClass(tabs.navigation)}` }, index.h("slot", { name: tabs.navigation })), index.h("section", { class: `tab ${this.getActiveClass(tabs.contact)}` }, index.h("slot", { name: tabs.contact })))
    ];
  }
  static get watchers() { return {
    "opened": ["onOpenChange"]
  }; }
};
SideDrawer.style = rarSideDrawerCss;

const rarSpinnerCss = ":host{--_primary-color:#3b01b3;display:block}.loader{width:34px;height:34px;margin:0 auto;border:3px solid transparent;border-top:3px solid var(--primary-color, var(--_primary-color));border-radius:50%;animation:rotate 0.4s infinite linear}@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}";

let RarSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h("div", { class: "loader" }));
  }
};
RarSpinner.style = rarSpinnerCss;

const ALPHAVANTAGE_API_KEY = 'RRFIH5T6P2NON4VR.';

const AV_BASE_URL$1 = 'https://www.alphavantage.co';
const getSymbols = async (serchedSymbol) => {
  const response = await fetch(`${AV_BASE_URL$1}/query?function=SYMBOL_SEARCH&keywords=${serchedSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`);
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

let RarStockFinder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.symbolSelected = index.createEvent(this, "symbolSelected", 7);
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
      return index.h("rar-spinner", null);
    }
    if (this.error) {
      return (index.h("p", null, this.error));
    }
    if (!this.error && !((_a = this.data) === null || _a === void 0 ? void 0 : _a.length)) {
      return (index.h("p", null, "No symbols to list"));
    }
    return (index.h("div", null, index.h("h2", null, "Results found"), index.h("ul", null, this.data.map(item => (index.h("li", { key: item.symbol, onClick: this.handleSymbolSelected.bind(this, item.symbol) }, index.h("strong", null, item.symbol), " / ", index.h("small", null, item.name)))))));
  }
  render() {
    return (index.h(index.Host, null, index.h("h1", null, "Symbol Finder"), index.h("form", { onSubmit: this.onFindStocks.bind(this) }, index.h("div", { class: "form-fields" }, index.h("input", { id: "stock-symbol", placeholder: "Enter the symbol here", autoComplete: 'off', value: this.searchSymbol, onInput: this.handleSearchSymbolChange.bind(this) })), index.h("button", { type: "submit", disabled: !this.hasSearchSymbol || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Find')), this.renderResult()));
  }
  static get watchers() { return {
    "searchSymbol": ["onSearchSymbleChange"]
  }; }
};
RarStockFinder.style = rarStockFinderCss;

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

let RarStockPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
      return index.h("rar-spinner", null);
    }
    if (!this.hasStockSymbolInput && !this.data) {
      return index.h("p", null, "No symbol have been entered");
    }
    if (this.hasStockSymbolInput && !this.error) {
      return index.h("p", null, "Price: ", this.data && this.data.price);
    }
    if (this.error) {
      return index.h("p", null, this.error);
    }
  }
  __stencil_render() {
    return [
      index.h("h1", null, "Stock Price"),
      index.h("form", { onSubmit: this.onSubmitForm.bind(this) }, index.h("div", { class: "form-fields" }, index.h("input", { id: "stock-symbol", value: this.stockSymbolInput, placeholder: "Enter the symbol here", autoComplete: 'off', onInput: this.onStockSymbolInput.bind(this) }), index.h("rar-tooltip", { text: "Enter a symbol in the field and press the button to recevie then information. Example: IBM, MSFT, AAPL" })), index.h("button", { type: "submit", disabled: !this.hasStockSymbolInput || this.isLoadingData }, this.isLoadingData ? 'Loading...' : 'Fetch')),
      index.h("div", null, this.renderResult())
    ];
  }
  static get watchers() { return {
    "stockSymbolProp": ["onSymbolPropChange"],
    "stockSymbolInput": ["onStockSymbolInputChange"]
  }; }
  render() { return index.h(index.Host, this.hostData(), this.__stencil_render()); }
};
RarStockPrice.style = rarStockPriceCss;

const rarTooltipCss = ":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:inline}:host([opened]) .tootlip_backdrop{display:block;pointer-events:all}:host([opened]) .tootlip_text{visibility:visible;opacity:1}.tootlip_backdrop{position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:var(--_layer-backdrop);display:none;pointer-events:none}.tooltip_icon{position:relative;display:inline-flex;justify-content:center;align-items:center;width:1.2rem;height:1.2rem;border-radius:50%;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));cursor:pointer}.tootlip_text{position:absolute;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));top:1.8rem;border-radius:4px;padding:0.5rem;font-size:0.9rem;line-height:1.4;width:max-content;max-width:200px;z-index:var(--_layer-base);outline:none;visibility:hidden;opacity:0;transition:all 0.4s ease-out}.tootlip_text::before{content:'';position:absolute;display:block;width:0px;left:50%;top:0.3rem;border:8px solid transparent;border-top:0;border-bottom:8px solid var(--primary-color, var(--_primary-color));transform:translate(-50%, calc(-100% - 5px))}";

let RarTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("div", { tabIndex: 0, class: 'tootlip_backdrop', onClick: this.onClose.bind(this) }), index.h("slot", null), index.h("span", { tabIndex: 1, class: "tooltip_icon", onClick: this.onOpen.bind(this), onKeyDown: this.onTooltipTextKeyDown.bind(this), ref: (el) => this.tooltipIconRef = el }, "?", index.h("div", { tabIndex: 1, class: 'tootlip_text', "aria-label": this.text, onClick: this.onClose.bind(this) }, this.text))));
  }
};
RarTooltip.style = rarTooltipCss;

exports.rar_side_drawer = SideDrawer;
exports.rar_spinner = RarSpinner;
exports.rar_stock_finder = RarStockFinder;
exports.rar_stock_price = RarStockPrice;
exports.rar_tooltip = RarTooltip;
