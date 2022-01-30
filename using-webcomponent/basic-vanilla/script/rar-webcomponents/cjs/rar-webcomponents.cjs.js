'use strict';

const index = require('./index-d2ebd7a3.js');

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('rar-webcomponents.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["rar-side-drawer_5.cjs",[[1,"rar-stock-price",{"stockSymbolProp":[1537,"symbol"],"stockSymbolInput":[32],"hasStockSymbolInput":[32],"isLoadingData":[32],"data":[32],"error":[32]},[[16,"symbolSelected","onStockSelectedHandler"]]],[1,"rar-stock-finder",{"searchSymbol":[32],"hasSearchSymbol":[32],"data":[32],"isLoadingData":[32],"error":[32]}],[1,"rar-side-drawer",{"title":[513],"opened":[516],"activeTab":[32]}],[1,"rar-tooltip",{"opened":[1540],"text":[1]}],[1,"rar-spinner"]]]], options);
});
