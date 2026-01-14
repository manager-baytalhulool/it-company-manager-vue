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
}

export type ReceiptIndex = Pick<
  Receipt,
  'id' | 'project_id' | 'invoice_id' | 'date' | 'description' | 'amount' | 'original_amount'
>


// id, project_id, invoice_id, date, description, amount, original_amount, created_at, updated_at
