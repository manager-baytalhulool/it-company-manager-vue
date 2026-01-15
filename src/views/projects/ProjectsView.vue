<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ProjectIndex } from '@/types/Project'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const projects = ref<ProjectIndex[]>([])
const selectedProject = ref<ProjectIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<ProjectIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Account ID', field: 'account_id' },
  { label: 'Currency ID', field: 'currency_id' },
  { label: 'Name', field: 'name' },
  { label: 'Amount', field: 'amount' },
  { label: 'Original Amount', field: 'original_amount' },
  { label: 'Paid', field: 'paid' },
  { label: 'Live URL', field: 'live_url' },
  { label: 'Actions', field: 'actions' },
]

const getProjects = async (params: PaginationParams) => {
  const response = await api.get('/api/projects', { params })
  return response.data.data.projects
}

const handleDeleteClick = (project: ProjectIndex) => {
  selectedProject.value = project
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/projects/${selectedProject.value!.id}`)
    const selectedProjectIndex = projects.value.findIndex((a) => a.id == selectedProject.value!.id)
    pagination.value.data.splice(selectedProjectIndex, 1)

    //     delete seasonalPlans.value[selectedSeasonalPlanId];
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<ProjectIndex>({
  fetchFunction: getProjects,
})

onMounted(() => {
  const modal = document.getElementById('modal-delete')
  if (modal) {
    modalDelete = new Modal(modal)
  }
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Projects</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/projects/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Projects</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-actions="{ row: project }">
                  <RouterLink :to="`/projects/${project.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(project)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-name="{ row: projectName }">
                  <RouterLink :to="`/projects/${projectName.id}`">
                    {{ projectName.name }}
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
