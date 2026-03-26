<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { LoanIndex } from '@/types/Loan'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'

const loans = ref<LoanIndex[]>([])
const selectedLoan = ref<LoanIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<LoanIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Account', field: 'account' },
  { label: 'Person', field: 'person' },
  { label: 'Description', field: 'description' },
  { label: 'Amount', field: 'amount' },
  { label: 'Paid Amount', field: 'paid_amount' },
  { label: 'Status', field: 'status' },
  { label: 'Actions', field: 'actions' },
]

const getLoans = async (params: PaginationParams) => {
  const response = await api.get('/api/loans', { params })
  return response.data.data.loans
}

const handleDeleteClick = (loan: LoanIndex) => {
  selectedLoan.value = loan
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/loans/${selectedLoan.value!.id}`)
    const selectedLoanIndex = loans.value.findIndex((l) => l.id == selectedLoan.value!.id)
    pagination.value.data.splice(selectedLoanIndex, 1)
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<LoanIndex>({
  fetchFunction: getLoans,
})

onMounted(() => {
  modalDelete = new Modal('#modal-delete')
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Loans</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/loans/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Loans</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-amount="{ row: loan }">
                  {{ Number(loan.amount).toLocaleString() }}
                </template>

                <template #cell-paid_amount="{ row: loan }">
                  {{ Number(loan.paid_amount).toLocaleString() }}
                </template>

                <template #cell-actions="{ row: loan }">
                  <RouterLink :to="`/loans/${loan.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(loan)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </template>
                <template #cell-account="{ row: loan }">
                  {{ loan.account?.name || '-' }}
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
