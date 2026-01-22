<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ReceiptIndex } from '@/types/Receipt'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { formatDate } from '@/utils/dateFormat'

const receipts = ref<ReceiptIndex[]>([])
const selectedReceipt = ref<ReceiptIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<ReceiptIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Project', field: 'project_id' },
  { label: 'Account', field: 'project' },
  { label: 'Invoice', field: 'invoice_id' },
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

const handleDeleteClick = (receipt: ReceiptIndex) => {
  selectedReceipt.value = receipt
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/receipts/${selectedReceipt.value!.id}`)
    const selectedReceiptIndex = receipts.value.findIndex((a) => a.id == selectedReceipt.value!.id)
    pagination.value.data.splice(selectedReceiptIndex, 1)

    //     delete seasonalPlans.value[selectedSeasonalPlanId];
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<ReceiptIndex>({
  fetchFunction: getReceipts,
})

onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete'))
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Receipts</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/receipts/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

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
                <template #cell-project_id="{ row: receipt }">
                  <RouterLink :to="`/projects/${receipt.project_id}`">
                    {{ receipt.project?.name }}
                  </RouterLink>
                </template>

                <template #cell-project="{ row: receipt }">
                  {{ receipt.project?.account?.name }}
                </template>

                <template #cell-invoice_id="{ row: receipt }">
                  {{ receipt.invoice_id }}
                </template>

                <template #cell-date="{ row: receipt }">
                  {{ formatDate(receipt.date) }}
                </template>

                <template #cell-amount="{ row: receipt }">
                  {{ Number(receipt.amount).toLocaleString() }}
                  {{ receipt.project?.currency?.code }}
                </template>

                <template #cell-original_amount="{ row: receipt }">
                  {{ Number(receipt.original_amount).toLocaleString() }}
                  {{ receipt.project?.currency?.code }}
                </template>

                <template #cell-actions="{ row: receipt }">
                  <RouterLink :to="`/receipts/${receipt.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(receipt)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-id="{ row: receiptName }">
                  <RouterLink :to="`/receipts/${receiptName.id}`">
                    {{ receiptName.id }}
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
