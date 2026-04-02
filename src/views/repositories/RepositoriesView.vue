<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { RepositoryIndex } from '@/types/Repository'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import AppModalDelete from '@/components/AppModalDelete.vue'

const repositories = ref<RepositoryIndex[]>([])
const selectedRepository = ref<RepositoryIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<RepositoryIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Type', field: 'repositable_type' },
  { label: 'Repository', field: 'repositable' },
  { label: 'Name', field: 'name' },
  { label: 'URL', field: 'url' },
  { label: 'Provider', field: 'provider' },
  { label: 'Actions', field: 'actions' },
]

const getRepositories = async (params: PaginationParams) => {
  const response = await api.get('/api/repositories', { params })
  return response.data.data.repositories
}

const handleDeleteClick = (repository: RepositoryIndex) => {
  selectedRepository.value = repository
  modalDelete!.show()
}

const handleDelete = async () => {
  console.log('ON DELETE')

  try {
    await api.delete(`api/repositories/${selectedRepository.value!.id}`)
    const selectedRepositoryIndex = repositories.value.findIndex(
      (r) => r.id == selectedRepository.value!.id,
    )
    pagination.value.data.splice(selectedRepositoryIndex, 1)

    //     delete seasonalPlans.value[selectedSeasonalPlanId];
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<RepositoryIndex>({
  fetchFunction: getRepositories,
})

onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete')!)
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Repositories</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/repositories/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Repositories</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-actions="{ row: repository }">
                  <RouterLink
                    :to="`/repositories/${repository.id}/edit`"
                    class="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(repository)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-repositable_type="{ row }">
                  {{ row.repositable_type === 'App\\Models\\Project' ? 'Project' : 'Product' }}
                </template>
                <template #cell-repositable="{ row }">
                  {{ row.repositable?.name || 'N/A' }}
                </template>
                <template #cell-name="{ row: repositoryName }">
                  <RouterLink :to="`/repositories/${repositoryName.id}`">
                    {{ repositoryName.name }}
                  </RouterLink>
                </template>
              </AppDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <AppModalDelete @onSubmit="handleDelete" />
</template>
