export interface Currency {
  id: number
  name: string
  code: string
  symbol: number
  exchange_rate: number
  created_at: string
  updated_at: string
}

export type CurrencyIndex = Pick<
  Currency,
  'id' | 'name' | 'code' | 'symbol' | 'exchange_rate'
>
