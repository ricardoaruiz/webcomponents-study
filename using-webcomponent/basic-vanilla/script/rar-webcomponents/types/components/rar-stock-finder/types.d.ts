export declare type SymbolsResponseType = {
  'bestMatches': SymbolResponseType[];
};
declare type SymbolResponseType = {
  '01. symbol': string;
  '02. name': string;
};
export declare type SymbolsData = {
  data: Symbol[];
};
export declare type Symbol = {
  symbol: string;
  name: string;
};
export {};
