<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { CurrencyIndex } from '@/types/Currency'
import type { IColumn, PaginationParams } from '@/types/Pagination'

const columns: IColumn<CurrencyIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Code', field: 'code' },
  { label: 'Symbol', field: 'symbol' },
  { label: 'Exchange Rate', field: 'exchange_rate' },
  { label: 'Actions', field: 'actions' },
]

const getCurrencies = async (params: PaginationParams) => {
  const response = await api.get('/api/currencies', { params })
  return response.data.data.currencies
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<CurrencyIndex>({
  fetchFunction: getCurrencies,
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Currencies</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Currencies</h5>
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
