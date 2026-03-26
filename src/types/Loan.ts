import type { BaseEntity } from './BaseEntity'

export interface Loan {
  id: number
  account_id: number | null
  person: string | null
  description: string
  amount: number
  paid_amount: number
  status: 'active' | 'paid'
  created_at: string
  updated_at: string
  account: BaseEntity | null
}

export type LoanIndex = Pick<
  Loan,
  'id' | 'person' | 'description' | 'amount' | 'paid_amount' | 'status' | 'account'
>
