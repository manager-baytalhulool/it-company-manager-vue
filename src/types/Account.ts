import type { BaseEntity } from './BaseEntity'

export interface Account {
  id: number
  name: string
  person: string
  original_amount: number
  amount: number
  created_at: string
  updated_at: string
  currency: BaseEntity
}

export type AccountIndex = Pick<
  Account,
  'id' | 'name' | 'person' | 'original_amount' | 'amount' | 'currency'
>
