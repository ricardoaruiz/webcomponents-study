import{r,c as o,h as t,H as e}from"./p-099413b7.js";let a=class{constructor(t){r(this,t),this.closeDrawer=o(this,"closeDrawer",7),this.activeTab="navigation"}onOpenChange(){this.opened&&this.drawerRef.focus()}handleClose(){console.log("internal closing..."),this.closeDrawer.emit()}handleChangeActiveTab(r){this.activeTab=r}getActiveClass(r){return this.activeTab===r?"active":""}onDrwawerKeyDown(r){"Escape"===r.key&&this.handleClose()}render(){return[t("div",{class:"backdrop "+(this.opened?"open":""),onClick:this.handleClose.bind(this),tabindex:"0"}),t("aside",{class:this.opened?"open":"",ref:r=>this.drawerRef=r,onKeyDown:this.onDrwawerKeyDown.bind(this),tabindex:"1"},t("header",null,t("h1",null,this.title),t("button",{type:"button",onClick:this.handleClose.bind(this)},"X")),t("section",{class:"tabs"},t("button",{class:this.getActiveClass("navigation"),onClick:this.handleChangeActiveTab.bind(this,"navigation")},"Navigation"),t("button",{class:this.getActiveClass("contact"),onClick:this.handleChangeActiveTab.bind(this,"contact")},"Contact")),t("section",{class:`tab ${this.getActiveClass("navigation")}`},t("slot",{name:"navigation"})),t("section",{class:`tab ${this.getActiveClass("contact")}`},t("slot",{name:"contact"})))]}static get watchers(){return{opened:["onOpenChange"]}}};a.style=":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--backdrop-color, var(--_backdrop-color));z-index:var(--_layer-backrop);opacity:0;pointer-events:none;transition:opacity 0.4s ease-out}.backdrop.open{opacity:1;pointer-events:all}aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;transition:left 0.4s ease-out;background-color:var(--background-color, var(--_background-color));box-shadow:var(--box-shadow, var(--_box-shadow));z-index:var(--_layer-base)}aside.open{left:0}header{display:flex;justify-content:space-between;align-items:center;height:4rem;padding:0 1rem;background-color:var(--primary-color, var(--_primary-color));color:var(--_white)}header h1{font-size:1.5rem;margin:0}header button{cursor:pointer;border:0;background-color:transparent;font-size:1.5rem;font-weight:500;color:var(--_white);align-self:stretch;padding:0 0.5rem}.tabs{display:flex;justify-content:center;align-items:center;margin:1rem 0}.tabs button{width:30%;padding:0.25rem 0;cursor:pointer;transition:all 0.3s ease-out}.tabs button{font-size:1rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse))}.tabs button:hover{background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tabs button.active{cursor:default;background-color:var(--second-color, var(--_second-color));color:var(--second-color-inverse, var(--_second-color-inverse))}.tab{visibility:hidden;opacity:0;height:0;transition:opacity 0.3s ease-out}.tab.active{visibility:visible;opacity:1;height:auto}";let i=class{constructor(o){r(this,o)}render(){return t("div",{class:"loader"})}};i.style=":host{--_primary-color:#3b01b3;display:block}.loader{width:34px;height:34px;margin:0 auto;border:3px solid transparent;border-top:3px solid var(--primary-color, var(--_primary-color));border-radius:50%;animation:rotate 0.4s infinite linear}@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}";let s=class{constructor(t){r(this,t),this.symbolSelected=o(this,"symbolSelected",7),this.hasSearchSymbol=!1,this.isLoadingData=!1,this.error=null}onSearchSymbleChange(r,o){r!==o&&(this.hasSearchSymbol=!!r,this.hasSearchSymbol||(this.data=[],this.error=null))}async onFindStocks(r){try{r.preventDefault(),this.error=null,this.isLoadingData=!0,this.data=(await(async r=>{const o=await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${r}&apikey=RRFIH5T6P2NON4VR.`),t=await o.json();if(t.Information)throw new Error("Exceeded calls, try later...");return t.bestMatches.length?{data:t.bestMatches.map((r=>({symbol:r["1. symbol"],name:r["2. name"]})))}:{data:[]}})(this.searchSymbol)).data}catch(r){this.error=r.message}finally{this.isLoadingData=!1}}handleSearchSymbolChange(r){this.searchSymbol=r.target.value}handleSymbolSelected(r){this.symbolSelected.emit(r)}renderResult(){var r;return this.isLoadingData?t("rar-spinner",null):this.error?t("p",null,this.error):this.error||(null===(r=this.data)||void 0===r?void 0:r.length)?t("div",null,t("h2",null,"Results found"),t("ul",null,this.data.map((r=>t("li",{key:r.symbol,onClick:this.handleSymbolSelected.bind(this,r.symbol)},t("strong",null,r.symbol)," / ",t("small",null,r.name)))))):t("p",null,"No symbols to list")}render(){return t(e,null,t("h1",null,"Symbol Finder"),t("form",{onSubmit:this.onFindStocks.bind(this)},t("div",{class:"form-fields"},t("input",{id:"stock-symbol",placeholder:"Enter the symbol here",autoComplete:"off",value:this.searchSymbol,onInput:this.handleSearchSymbolChange.bind(this)})),t("button",{type:"submit",disabled:!this.hasSearchSymbol||this.isLoadingData},this.isLoadingData?"Loading...":"Find")),this.renderResult())}static get watchers(){return{searchSymbol:["onSearchSymbleChange"]}}};s.style=":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:block;font-family:sans-serif;padding:1rem;border-radius:0.5rem;box-shadow:var(--box-shadow, var(--_box-shadow));background-color:var(--_white);color:var(--_black);max-width:400px}form{display:flex;flex-direction:column}.form-fields{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}form input{flex:1;width:100%;font:inherit;color:var(--primary-color, var(--_primary-color));padding:0.5rem;outline:none;border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem;margin-right:0.5rem}form input::placeholder{color:var(--primary-color, var(--_primary-color))}form button{font:inherit;padding:0.25rem 0.5rem;border-radius:0.25rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_white));cursor:pointer;outline:none;align-self:flex-end;min-width:8rem}form button:hover,form button:active{background-color:var(--second-color, var(--_second-color));border:1px solid var(--second-color, var(--_second-color))}form button:disabled{background-color:var(--primary-color, var(--_primary-color));opacity:0.5;cursor:default}ul{margin:0;padding:0;list-style:none;max-height:15rem;overflow-y:auto}li{margin:0.25rem 0;padding:0.4rem;color:var(--primary-color, var(--_primary-color));border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem}li:hover{background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_black));color:var(--_white);cursor:pointer}";let n=class{constructor(o){r(this,o),this.isLoadingData=!1,this.error=null}onSymbolPropChange(r,o){r!==o&&(this.stockSymbolInput=r,this.fetchData(r))}onStockSymbolInputChange(r,o){r!==o&&(this.hasStockSymbolInput=!!r,this.hasStockSymbolInput||(this.data=null))}onStockSelectedHandler(r){this.stockSymbolProp=r.detail}async onSubmitForm(r){r.preventDefault(),this.stockSymbolInput&&this.fetchData(this.stockSymbolInput)}onStockSymbolInput(r){this.stockSymbolInput=r.target.value}async fetchData(r){try{this.error=null,this.isLoadingData=!0;const o=await(async r=>{const o=await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${r}&apikey=RRFIH5T6P2NON4VR.`),t=await o.json();if(t.Note)throw new Error("Exceeded calls, try later...");if(!t["Global Quote"]["01. symbol"])throw new Error("Invalid Symbol. Try another one.");const{"Global Quote":{"01. symbol":e,"05. price":a}}=t;return{symbol:e,price:+a}})(r);this.data=o}catch(r){this.error=r.message,this.data=null}finally{this.isLoadingData=!1}}componentWillLoad(){if(this.stockSymbolProp)return this.stockSymbolInput=this.stockSymbolProp,this.fetchData(this.stockSymbolProp)}hostData(){return{class:this.error&&"error"}}renderResult(){return this.isLoadingData?t("rar-spinner",null):this.hasStockSymbolInput||this.data?this.hasStockSymbolInput&&!this.error?t("p",null,"Price: ",this.data&&this.data.price):this.error?t("p",null,this.error):void 0:t("p",null,"No symbol have been entered")}__stencil_render(){return[t("h1",null,"Stock Price"),t("form",{onSubmit:this.onSubmitForm.bind(this)},t("div",{class:"form-fields"},t("input",{id:"stock-symbol",value:this.stockSymbolInput,placeholder:"Enter the symbol here",autoComplete:"off",onInput:this.onStockSymbolInput.bind(this)}),t("rar-tooltip",{text:"Enter a symbol in the field and press the button to recevie then information. Example: IBM, MSFT, AAPL"})),t("button",{type:"submit",disabled:!this.hasStockSymbolInput||this.isLoadingData},this.isLoadingData?"Loading...":"Fetch")),t("div",null,this.renderResult())]}static get watchers(){return{stockSymbolProp:["onSymbolPropChange"],stockSymbolInput:["onStockSymbolInputChange"]}}render(){return t(e,this.hostData(),this.__stencil_render())}};n.style=":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:block;font-family:sans-serif;padding:1rem;border-radius:0.5rem;box-shadow:var(--box-shadow, var(--_box-shadow));background-color:var(--_white);color:var(--_black);max-width:400px}:host(.error){box-shadow:var(--box-shadow-error, var(--_box-shadow-error))}form{display:flex;flex-direction:column}.form-fields{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}form input{flex:1;width:100%;font:inherit;color:var(--primary-color, var(--_primary-color));padding:0.5rem;outline:none;border:1px solid var(--primary-color, var(--_primary-color));border-radius:0.25rem;margin-right:0.5rem}form input::placeholder{color:var(--primary-color, var(--_primary-color))}form button{font:inherit;padding:0.25rem 0.5rem;border-radius:0.25rem;border:1px solid var(--primary-color, var(--_primary-color));background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_white));cursor:pointer;outline:none;align-self:flex-end;min-width:8rem}form button:hover,form button:active{background-color:var(--second-color, var(--_second-color));border:1px solid var(--second-color, var(--_second-color))}form button:disabled{background-color:var(--primary-color, var(--_primary-color));opacity:0.5;cursor:default}";let l=class{constructor(o){r(this,o),this.opened=!1}onOpen(){this.opened=!0,this.tooltipIconRef.focus()}onClose(r){null==r||r.stopPropagation(),this.opened=!1}onTooltipTextKeyDown(r){"Escape"===r.key&&this.onClose()}render(){return t(e,null,t("div",{tabIndex:0,class:"tootlip_backdrop",onClick:this.onClose.bind(this)}),t("slot",null),t("span",{tabIndex:1,class:"tooltip_icon",onClick:this.onOpen.bind(this),onKeyDown:this.onTooltipTextKeyDown.bind(this),ref:r=>this.tooltipIconRef=r},"?",t("div",{tabIndex:1,class:"tootlip_text","aria-label":this.text,onClick:this.onClose.bind(this)},this.text)))}};l.style=":host{--_white:#fff;--_black:#333;--_primary-color:#4a00dd;--_primary-color-inverse:#e6e6e6;--_second-color:#2d1363;--_second-color-inverse:#e6e6e6;--_box-shadow:2px 4px 8px rgba(0,0,0,0.2);--_box-shadow-error:2px 4px 8px rgba(255,0,0,0.2);--_backdrop-color:rgba(0,0,0,0.4);--_background-color:#f3f3f3;--_layer-backdrop:10;--_layer-base:20}:host{display:inline}:host([opened]) .tootlip_backdrop{display:block;pointer-events:all}:host([opened]) .tootlip_text{visibility:visible;opacity:1}.tootlip_backdrop{position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:var(--_layer-backdrop);display:none;pointer-events:none}.tooltip_icon{position:relative;display:inline-flex;justify-content:center;align-items:center;width:1.2rem;height:1.2rem;border-radius:50%;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));cursor:pointer}.tootlip_text{position:absolute;background-color:var(--primary-color, var(--_primary-color));color:var(--primary-color-inverse, var(--_primary-color-inverse));top:1.8rem;border-radius:4px;padding:0.5rem;font-size:0.9rem;line-height:1.4;width:max-content;max-width:200px;z-index:var(--_layer-base);outline:none;visibility:hidden;opacity:0;transition:all 0.4s ease-out}.tootlip_text::before{content:'';position:absolute;display:block;width:0px;left:50%;top:0.3rem;border:8px solid transparent;border-top:0;border-bottom:8px solid var(--primary-color, var(--_primary-color));transform:translate(-50%, calc(-100% - 5px))}";export{a as rar_side_drawer,i as rar_spinner,s as rar_stock_finder,n as rar_stock_price,l as rar_tooltip}