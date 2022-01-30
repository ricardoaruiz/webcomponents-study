import { ALPHAVANTAGE_API_KEY } from "../../global/global"
import { SymbolsData, SymbolsResponseType } from "./types"

const AV_BASE_URL = 'https://www.alphavantage.co'

export const getSymbols = async (serchedSymbol: string) => {
  const response = await fetch(
    `${AV_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${serchedSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`
  )
  const data: SymbolsResponseType = await response.json()

  if (data['Information']) {
    throw new Error('Exceeded calls, try later...')
  }

  if (!data.bestMatches.length) {
    return {
      data: []
    } as SymbolsData
  }

  const stockData = {
    data: data.bestMatches.map(item => ({
      symbol: item["1. symbol"],
      name: item["2. name"]
    }))
  } as SymbolsData

  return stockData
}
