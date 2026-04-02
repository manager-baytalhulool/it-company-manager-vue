export interface Repository {
  id: number
  repositable_id: number
  repositable_type: string
  repositable?: { id: number; name: string }
  name: string
  url: string
  provider: string
  created_at: number
  updated_at: string
}

export type RepositoryIndex = Pick<
  Repository,
  'id' | 'name' | 'url' | 'provider' | 'repositable_id' | 'repositable_type' | 'repositable'
>
