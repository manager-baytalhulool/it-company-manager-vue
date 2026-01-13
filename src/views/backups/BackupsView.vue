<script setup lang="ts">
import api from '@/plugins/axios'
import { ref } from 'vue'

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

const isDownloading = ref(false)
const progress = ref(0)

const handleDownloadClick = async (backup: any) => {
  progress.value = 0
  isDownloading.value = true

  try {
    const response = await api.get(`/api/files/${backup.id}/download`, {
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
</script>
<template>
  <h1>MUHAMMAD</h1>
  <button class="btn btn-primary" @click="handleDownloadClick(backups[0])">Download</button>
  <div v-if="isDownloading" class="progress-wrapper">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    <span>{{ progress }}%</span>
  </div>
</template>
