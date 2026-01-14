<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ReceiptIndex } from '@/types/Receipt'
import type { IColumn, PaginationParams } from '@/types/Pagination'

const columns: IColumn<ReceiptIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Project ID', field: 'project_id' },
  { label: 'Invioce ID', field: 'invoice_id' },
  { label: 'Date', field: 'date' },
  { label: 'Description', field: 'description' },
  { label: 'Amount', field: 'amount' },
  { label: 'Original Amount', field: 'original_amount' },
  { label: 'Actions', field: 'actions' },
]

const getReceipts = async (params: PaginationParams) => {
  const response = await api.get('/api/receipts', { params })
  return response.data.data.receipts
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<ReceiptIndex>({
  fetchFunction: getReceipts,
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Receipts</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Receipts</h5>
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
