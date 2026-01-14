<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { RepositoryIndex } from '@/types/Repository'
import type { IColumn, PaginationParams } from '@/types/Pagination'

const columns: IColumn<RepositoryIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Project ID', field: 'project_id' },
  { label: 'Name', field: 'name' },
  { label: 'URL', field: 'url' },
  { label: 'Provider', field: 'provider' },
  { label: 'Actions', field: 'actions' },
]

const getRepositories = async (params: PaginationParams) => {
  const response = await api.get('/api/repositories', { params })
  return response.data.data.repositories
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<RepositoryIndex>({
  fetchFunction: getRepositories,
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Repositories</h1>

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
              </AppDataTable>


            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
