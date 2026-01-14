

export interface Repository {
  id: number
  project_id: number
  name: string
  url: string
  provider: string
  created_at: number
  updated_at: string
}

export type RepositoryIndex = Pick<
  Repository,
  'id' | 'project_id' | 'name' | 'url' | 'provider'
>
