<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import { Modal } from 'bootstrap'
import type { AccountIndex } from '@/types/Account'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { onMounted, ref } from 'vue'

const accounts = ref<AccountIndex[]>([])
const selectedAccount = ref<AccountIndex | null>(null)

let modalDelete: Modal | null = null

const columns: IColumn<AccountIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Person', field: 'person' },
  { label: 'Original Amount Earned', field: 'original_amount' },
  { label: 'Amount in PKR', field: 'amount' },
  { label: 'Actions', field: 'actions' },
]

const getAccounts = async (params: PaginationParams) => {
  const response = await api.get('/api/accounts', { params })
  return response.data.data.accounts
}

const handleDeleteClick = (account: AccountIndex) => {
  selectedAccount.value = account
  modalDelete!.show()
}

const handleDelete = async () => {
  console.log("ON DELETE");

  try {
    await api.delete(`api/accounts/${selectedAccount.value!.id}`)
    const selectedAccountIndex = accounts.value.findIndex((a) => a.id == selectedAccount.value!.id)
    pagination.value.data.splice(selectedAccountIndex, 1)

    //     delete seasonalPlans.value[selectedSeasonalPlanId];
  } catch (ex) {
    console.log(ex)
    alert('something went wrong')
  }

  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange } = useDataTable<AccountIndex>({
  fetchFunction: getAccounts,
})

onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete'))
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Accounts</h1>

      <div class="row">
        <div class="col-12">
          <div class="mb-3 text-end">
            <RouterLink to="/accounts/create">
              <button class="btn btn-success">Add new</button>
            </RouterLink>
          </div>
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Manage Accounts</h5>
            </div>
            <div class="card-body">
              <AppDataTable
                :pagination="pagination"
                @search-change="handleSearchChange"
                @page-change="handlePageChange"
                :columns="columns"
              >
                <template #cell-actions="{ row: account }">
                  <RouterLink :to="`/accounts/${account.id}/edit`" class="btn btn-info btn-sm me-2">
                    Edit
                  </RouterLink>

                  <button @click="handleDeleteClick(account)" class="btn btn-danger btn-sm">Delete</button>
                </template>
                <template #cell-name="{ row: accountName }">
                  <RouterLink :to="`/accounts/${accountName.id}`">
                    {{ accountName.name }}
                  </RouterLink>
                </template>
                <template #table-footer>
                  <tfoot>
                    <tr>
                      <th colspan="4" class="text-right">Total</th>
                      <th>{{ 'sum amount' }}</th>
                      <th></th>
                    </tr>
                  </tfoot>
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
