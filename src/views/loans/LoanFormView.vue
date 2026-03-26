<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

import FormInput from '@/components/form/FormInput.vue'
import vSelect from 'vue-select'

const route = useRoute()
const id = route.params.id
const router = useRouter()

const isEditMode = id ? true : false

const accounts = ref<any[]>([])
const formBody = ref({
  account_id: '',
  person: '',
  description: '',
  amount: '',
  paid_amount: '',
  status: 'active',
})

watch(
  () => formBody.value.status,
  (newVal) => {
    if (newVal === 'paid') {
      formBody.value.paid_amount = formBody.value.amount
    }
  },
)

const getAccounts = async () => {
  const response = await api.get('/api/accounts', {
    params: {
      for: 'select',
    },
  })
  accounts.value = response.data.data.accounts
}

const getLoan = async () => {
  const response = await api.get(`/api/loans/${id}`)
  const loan = response.data.data.loan
  formBody.value = {
    account_id: loan.account_id || '',
    person: loan.person || '',
    description: loan.description,
    amount: loan.amount,
    paid_amount: loan.paid_amount,
    status: loan.status,
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/loans/${id}`, formBody.value)
    } else {
      await api.post('/api/loans', formBody.value)
    }
    router.push('/loans')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getAccounts()
  if (isEditMode) await getLoan()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Loans</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add New' }} Loan</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <label class="form-label">Account</label>
                <v-select
                  :options="accounts"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.account_id"
                  :clearable="true"
                  placeholder="Select Account"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="person" label="Person" v-model="formBody.person" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="description"
                  label="Description"
                  v-model="formBody.description"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="amount" label="Amount" v-model="formBody.amount" type="number" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="paid_amount"
                  label="Paid Amount"
                  v-model="formBody.paid_amount"
                  type="number"
                />
              </div>
              <div class="col-md-6">
                <label for="status" class="form-label">Status</label>
                <select class="form-control" id="status" v-model="formBody.status">
                  <option value="active">Active</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Loan</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
