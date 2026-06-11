<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const selected = ref<any | null>(null)
let modalDelete: Modal | null = null

const columns = [
  { label: '#', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Order No', field: 'order_no' },
  { label: 'Actions', field: 'actions' },
]

const getTechnologies = async (params: any) => {
  const response = await api.get('/api/technologies', { params })
  return response.data.data.technologies
}

const handleDeleteClick = (tech: any) => {
  selected.value = tech
  modalDelete!.show()
}
const handleDelete = async () => {
  try {
    await api.delete(`api/technologies/${selected.value!.id}`)
    reload()
  } catch {}
  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange, reload } = useDataTable<any>({
  fetchFunction: getTechnologies,
})
onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete')!)
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Technologies</h1>
      <div class="mb-3 text-end">
        <RouterLink to="/technologies/create" class="btn btn-success">Add new</RouterLink>
      </div>
      <div class="card">
        <div class="card-body">
          <AppDataTable
            :pagination="pagination"
            @search-change="handleSearchChange"
            @page-change="handlePageChange"
            :columns="columns"
          >
            <template #cell-actions="{ row }"
              ><RouterLink :to="`/technologies/${row.id}/edit`" class="btn btn-info btn-sm me-2"
                >Edit</RouterLink
              ><button @click="handleDeleteClick(row)" class="btn btn-danger btn-sm">
                Delete
              </button></template
            >
          </AppDataTable>
        </div>
      </div>
    </div>
  </main>
  <AppModalDelete @onSubmit="handleDelete" />
</template>
