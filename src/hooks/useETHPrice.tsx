import { useQuery } from '@tanstack/react-query'
import ms from 'ms'

export function useETHPrice() {
  const { data, ...rest } = useQuery({
    queryKey: ['ethPrice'],
    queryFn: async () => {
      const r = await fetch(`/api/price/ETH-USD`).then<R>((r) => r.json())

      return r.chart.result[0].meta.regularMarketPrice.toFixed(2)
    },
    refetchInterval: ms('10s'),
    refetchIntervalInBackground: true,
  })

  return { ethPrice: data, ...rest }
}

// Generated by https://quicktype.io

export interface R {
  chart: Chart
}

export interface Chart {
  result: Result[]
  error: null
}

export interface Result {
  meta: Meta
  timestamp: number[]
  indicators: Indicators
}

export interface Indicators {
  quote: Quote[]
}

export interface Quote {
  close: Array<number | null>
  high: Array<number | null>
  low: Array<number | null>
  open: Array<number | null>
  volume: Array<number | null>
}

export interface Meta {
  currency: string
  symbol: string
  exchangeName: string
  instrumentType: string
  firstTradeDate: number
  regularMarketTime: number
  gmtoffset: number
  timezone: string
  exchangeTimezoneName: string
  regularMarketPrice: number
  chartPreviousClose: number
  previousClose: number
  scale: number
  priceHint: number
  currentTradingPeriod: CurrentTradingPeriod
  tradingPeriods: Array<Post[]>
  dataGranularity: string
  range: string
  validRanges: string[]
}

export interface CurrentTradingPeriod {
  pre: Post
  regular: Post
  post: Post
}

export interface Post {
  timezone: string
  end: number
  start: number
  gmtoffset: number
}
