export interface Expense {
  id: number
  description: string
  amount: number
  created_at: string
  updated_at: string
}

export type ExpenseIndex = Pick<Expense, 'id' | 'description' | 'amount'>
