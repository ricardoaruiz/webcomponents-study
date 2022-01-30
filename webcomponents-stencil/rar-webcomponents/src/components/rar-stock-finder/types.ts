export type SymbolsResponseType = {
  'bestMatches': SymbolResponseType[]
}

type SymbolResponseType = {
  '01. symbol': string
  '02. name': string
}

export type SymbolsData = {
  data: Symbol[]
}

export type Symbol = {
  symbol: string
  name: string
}
