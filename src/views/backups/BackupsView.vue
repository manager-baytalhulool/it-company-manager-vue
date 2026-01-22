<script setup lang="ts">
import api from '@/plugins/axios'
import { onMounted, ref } from 'vue'
import AppDataTable from '@/components/AppDataTable.vue'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { useDataTable } from '@/composables/useDataTable'
import type { InvoiceIndex } from '@/types/Invoice'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import type { BackupIndex } from '@/types/Backup'

// const statuses = ["initialized", "completed", "failed", "expired"];
const backups = [
  {
    id: 1,
    name: '2026-01-01-backup.zip',
    path: 'https://file-examples.com/wp-content/storage/2017/02/zip_10MB.zip',
    size: '1048576',
    status: 'completed',
  },
]

const columns: IColumn<BackupIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'File Path', field: 'file_path' },
  { label: 'Size', field: 'size' },
  { label: 'Status', field: 'status' },
  { label: 'Created At', field: 'created_at' },
  { label: 'Actions', field: 'actions' },
]

const isDownloading = ref(false)
const progress = ref(0)
const selectedBackup = ref<BackupIndex | null>(null)

let modalDelete: Modal | null = null

const getBackups = async (params: PaginationParams) => {
  const response = await api.get('/api/backup', { params })
  return response.data.data.backups
}

const handleDeleteClick = (backup: BackupIndex) => {
  selectedBackup.value = backup
  modalDelete!.show()
}

const handleDownloadClick = async (backup: any) => {
  progress.value = 0
  isDownloading.value = true

  try {
    // const response = await api.get(`/api/files/${backup.id}/download`, {
    const response = await api.get(`/api/backup`, {
      responseType: 'blob',
      onDownloadProgress: (event) => {
        if (event.lengthComputable && event.total) {
          progress.value = Math.round((event.loaded * 100) / event.total)
        }
      },
    })

    // Create download
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'file.pdf' // or get from headers
    link.click()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed', error)
  } finally {
    isDownloading.value = false
  }
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<BackupIndex>({
  fetchFunction: getBackups,
})

onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete'))
})
</script>
<template>
  <h1>MUHAMMAD</h1>
  <button class="btn btn-primary" @click="handleDownloadClick(backups[0])">Download</button>
  <div v-if="isDownloading" class="progress-wrapper">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    <span>{{ progress }}%</span>
  </div>

  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Backups</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/backups/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Backups</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-id="{ row: backupId }">
                  <RouterLink :to="`/backups/${backupId.id}`">
                    {{ backupId.id }}
                  </RouterLink>
                </template>
                <template #cell-actions="{ row: backup }">
                  <RouterLink :to="`/backups/${backup.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(backup)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-name="{ row: backupName }">
                  <RouterLink :to="`/backups/${backupName.id}`">
                    {{ backupName.name }}
                  </RouterLink>
                </template>
              </AppDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
