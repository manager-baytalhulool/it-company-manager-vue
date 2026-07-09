<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ExpenseIndex } from '@/types/Expense'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/dateFormat'

const expenses = ref<ExpenseIndex[]>([])
const selectedExpense = ref<ExpenseIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<ExpenseIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Date', field: 'created_at' },

  { label: 'Description', field: 'description' },
  { label: 'Amount', field: 'amount' },
  { label: 'Actions', field: 'actions' },
]

const getExpenses = async (params: PaginationParams) => {
  const response = await api.get('/api/expenses', { params })
  return response.data.data.expenses
}

const handleDeleteClick = (expense: ExpenseIndex) => {
  selectedExpense.value = expense
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/expenses/${selectedExpense.value!.id}`)
    const selectedExpenseIndex = expenses.value.findIndex((e) => e.id == selectedExpense.value!.id)
    pagination.value.data.splice(selectedExpenseIndex, 1)
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<ExpenseIndex>({
  fetchFunction: getExpenses,
})

onMounted(() => {
  modalDelete = new Modal('#modal-delete')
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Expenses</h1>

      <div class="mb-3 text-end">
        <RouterLink to="/expenses/create">
          <button class="btn btn-success">Add new</button>
        </RouterLink>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Expenses</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-created_at="{ row: expense }">
                  {{ formatDate(expense.created_at) }}
                </template>

                <template #cell-amount="{ row: expense }">
                  {{ Number(expense.amount).toLocaleString() }}
                </template>

                <template #cell-actions="{ row: expense }">
                  <RouterLink :to="`/expenses/${expense.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(expense)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
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
