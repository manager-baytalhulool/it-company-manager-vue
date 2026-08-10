import type { CurrencyIndex } from './Currency'
import type { Project } from './Project'

export interface Account {
  id: number
  name: string
  person: string
  original_amount: number
  amount: number
  created_at: string
  updated_at: string
  currency: CurrencyIndex
  projects_count: number
  phone: string | null
  projects: Project[]
  address: string | null
}

export type AccountIndex = Pick<
  Account,
  'id' | 'name' | 'person' | 'original_amount' | 'amount' | 'currency'
>
