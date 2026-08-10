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
import ReceiptForm from '@/components/ReceiptForm.vue'

const invoices = ref<InvoiceIndex[]>([])
const selectedInvoice = ref<InvoiceIndex | null>(null)

let modalDelete: Modal | null = null

const selectedInvoiceIndex = ref<number | null>(null)
let receiptFormModal: Modal | null = null

const columns: IColumn<InvoiceIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Project', field: 'project' },
  { label: 'Currency', field: 'currency' },
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

const handleReceiptSubmit = () => {
  if (selectedInvoiceIndex.value !== null) {
    pagination.value.data[selectedInvoiceIndex.value]!.status = 'paid'
  }
  receiptFormModal?.hide()
}

// , $event: Event
const handleReceivedClick = (invoice: InvoiceIndex, index: number) => {
  selectedInvoice.value = invoice
  selectedInvoiceIndex.value = index
  receiptFormModal?.show()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<InvoiceIndex>({
  fetchFunction: getInvoices,
})
onMounted(() => {
  const deleteModalEl = document.getElementById('modal-delete')
  if (deleteModalEl) {
    modalDelete = new Modal(deleteModalEl)
  }
  const receiptModalEl = document.getElementById('receipt-form-modal')
  if (receiptModalEl) {
    receiptFormModal = new Modal(receiptModalEl)
  }
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
                <template #cell-project="{ row: invoice }">
                  {{ invoice.project?.name }}
                </template>
                <template #cell-currency="{ row: invoice }">
                  {{ invoice.currency?.name }}
                </template>
                <template #cell-date="{ row: invoice }">
                  {{ formatDate(invoice.date) }}
                </template>
                <template #cell-due_date="{ row: invoice }">
                  {{ formatDate(invoice.due_date) }}
                </template>

                <template #cell-amount="{ row: invoice }">
                  {{ Number(invoice.amount).toLocaleString() }} {{ invoice.currency?.code }}
                </template>

                <template #cell-actions="{ row: invoice, rowIndex: i }">
                  <RouterLink :to="`/invoices/${invoice.id}`" class="btn btn-success btn-sm me-2">
                    View
                  </RouterLink>
                  <RouterLink
                    v-if="invoice.status !== 'paid'"
                    :to="`/invoices/${invoice.id}/edit`"
                    class="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </RouterLink>

                  <button
                    v-if="invoice.status !== 'paid'"
                    class="btn btn-primary btn-sm me-2"
                    @click="handleReceivedClick(invoice, i)"
                  >
                    Receive
                  </button>
                  <template v-if="invoice.status === 'pending'">
                    <button @click="handleDeleteClick(invoice)" class="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </template>
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="receipt-form-modal"
    tabindex="-1"
    aria-labelledby="receipt-form-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="receipt-form-modal-label">Receipts</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="selectedInvoice">
          <receipt-form
            action="/api/receipts"
            :invoice="selectedInvoice"
            :projects="selectedInvoice ? [selectedInvoice.project] : []"
            :key="selectedInvoice?.id"
            @onSubmit="handleReceiptSubmit"
          ></receipt-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  <AppModalDelete @onSubmit="handleDelete" />
</template>
