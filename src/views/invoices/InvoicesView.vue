<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { InvoiceIndex } from '@/types/Invoice'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/dateFormat'

const invoices = ref<InvoiceIndex[]>([])
const selectedInvoice = ref<InvoiceIndex | null>(null)

let modalDelete: Modal | null = null

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

const handleDeleteClick = (invoice: InvoiceIndex) => {
  selectedInvoice.value = invoice
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/invoices/${selectedInvoice.value!.id}`)
    const selectedInvoiceIndex = invoices.value.findIndex((a) => a.id == selectedInvoice.value!.id)
    pagination.value.data.splice(selectedInvoiceIndex, 1)

    //     delete seasonalPlans.value[selectedSeasonalPlanId];
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<InvoiceIndex>({
  fetchFunction: getInvoices,
})
onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete'))
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Invoices</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/invoices/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

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
                <template #cell-id="{ row: invoiceId }">
                  <RouterLink :to="`/invoices/${invoiceId.id}`">
                    {{ invoiceId.id }}
                  </RouterLink>
                </template>
                <template #cell-date="{ row: invoice }">
                  {{ formatDate(invoice.date) }}
                </template>
                <template #cell-due_date="{ row: invoice }">
                  {{ formatDate(invoice.due_date) }}
                </template>

                <template #cell-amount="{ row: invoice }">
                  {{ Number(invoice.amount).toLocaleString() }}
                  <!-- {{ invoice.project?.account?.currency?.code }} -->
                </template>

                <template #cell-actions="{ row: invoice }">
                  <RouterLink :to="`/invoices/${invoice.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(invoice)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-name="{ row: invoiceName }">
                  <RouterLink :to="`/invoices/${invoiceName.id}`">
                    {{ invoiceName.id }}
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
