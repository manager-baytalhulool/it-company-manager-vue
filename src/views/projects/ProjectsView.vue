<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ProjectIndex } from '@/types/Project'
import type { IColumn, PaginationParams } from '@/types/Pagination'

const columns: IColumn<ProjectIndex>[] = [
  { label: '#', field: 'id' },
  { label: '#', field: 'account_id' },
  { label: '#', field: 'currency_id' },
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

const { pagination, handlePageChange, handleSearchChange } = useDataTable<ProjectIndex>({
  fetchFunction: getProjects,
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Projects</h1>

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
              </AppDataTable>


            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
