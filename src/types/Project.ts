import type { Account } from "./Account"
import type { Currency } from "./Currency"

export interface Project {
  id: number
  account_id: number
  currency_id: number
  name: string
  amount: number
  original_amount: number
  paid: number
  live_url: string
  account: Account
  currency: Currency
}

export type ProjectIndex = Pick<
  Project,
  'id' | 'account_id' | 'currency_id' | 'name' | 'amount' | 'original_amount' | 'paid' | 'live_url' | 'account' | 'currency'
>

