export interface AccountHead {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type AccountHeadIndex = Pick<
  AccountHead,
  'id' | 'name'
>
