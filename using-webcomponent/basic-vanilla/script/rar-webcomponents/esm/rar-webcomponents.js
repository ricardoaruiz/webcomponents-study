import { p as promiseResolve, b as bootstrapLazy } from './index-138c8f20.js';

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["rar-side-drawer_5",[[1,"rar-stock-price",{"stockSymbolProp":[1537,"symbol"],"stockSymbolInput":[32],"hasStockSymbolInput":[32],"isLoadingData":[32],"data":[32],"error":[32]},[[16,"symbolSelected","onStockSelectedHandler"]]],[1,"rar-stock-finder",{"searchSymbol":[32],"hasSearchSymbol":[32],"data":[32],"isLoadingData":[32],"error":[32]}],[1,"rar-side-drawer",{"title":[513],"opened":[516],"activeTab":[32]}],[1,"rar-tooltip",{"opened":[1540],"text":[1]}],[1,"rar-spinner"]]]], options);
});
