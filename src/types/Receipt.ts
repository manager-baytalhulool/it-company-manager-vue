import type { Invoice } from './Invoice'
import type { Project } from './Project'

export interface Receipt {
  id: number
  project_id: number
  invoice_id: number
  date: string
  description: string
  amount: number
  original_amount: number
  created_at: string
  updated_at: string
  project: Project
  invoice: Invoice
  currency_id: number
}

export type ReceiptIndex = Pick<
  Receipt,
  | 'id'
  | 'project_id'
  | 'invoice_id'
  | 'date'
  | 'description'
  | 'amount'
  | 'original_amount'
  | 'project'
  | 'currency_id'
>

// id, project_id, invoice_id, date, description, amount, original_amount, created_at, updated_at
