<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { InvoiceIndex } from '@/types/Invoice'
import type { IColumn, PaginationParams } from '@/types/Pagination'

const columns: IColumn<InvoiceIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Project ID', field: 'project_id' },
  { label: 'Currency ID', field: 'currency_id' },
  { label: 'Date', field: 'date' },
  { label: 'Due Date', field: 'due_date' },
  { label: 'Description', field: 'description' },
  { label: 'Amount', field: 'amount' },
  { label: 'Status', field: 'status' },
  { label: 'Actions', field: 'actions' },
]

const getInvoices = async (params: PaginationParams) => {
  const response = await api.get('/api/invoices', { params })
  return response.data.data.invoices
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<InvoiceIndex>({
  fetchFunction: getInvoices,
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Invoices</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Invoices</h5>
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
