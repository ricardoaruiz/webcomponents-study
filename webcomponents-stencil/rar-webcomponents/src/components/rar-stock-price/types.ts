export type StockResponseType = {
  'Global Quote': {
    '01. symbol': string
    '05. price': string
  }
}

export type StockData = {
  symbol: string
  price: number
}
