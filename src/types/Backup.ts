interface Backup {
  id: number
  name: string
  file_path: string
  size: number
  status: 'pending' | 'completed' | 'failed'
  created_at: Date
  updated_at: Date
  deleted_at?: Date | null
}

export type BackupIndex = Pick<
  Backup,
  'id' | 'name' | 'size' | 'created_at' | 'status' | 'file_path'
>

export type { Backup }
