import type { Project } from './Project'

export interface Invoice {
  id: number
  project: Project
  project_id: number
  currency_id: number
  currency: { id: number; name: string; code: string }
  date: string
  due_date: string
  description: string
  amount: number
  status: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export type InvoiceIndex = Pick<
  Invoice,
  | 'id'
  | 'project'
  | 'project_id'
  | 'currency_id'
  | 'currency'
  | 'date'
  | 'due_date'
  | 'description'
  | 'amount'
  | 'status'
>

// id, project_id, currency_id, date, due_date, description, amount, status, created_at, updated_at, deleted_at
