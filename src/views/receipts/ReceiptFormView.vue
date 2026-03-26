<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'
import vSelect from 'vue-select'

const route = useRoute()
const id = route.params.id
const router = useRouter()
const isEditMode = id ? true : false

const projects = ref([])
const invoices = ref([])
const formBody = ref({
  project_id: '',
  invoice_id: '',
  date: '',
  description: '',
  amount: '',
  original_amount: '',
})

const getProjects = async () => {
  const response = await api.get('/api/projects', {
    params: {
      for: 'select',
    },
  })
  projects.value = response.data.data.projects
}

const getInvoices = async () => {
  const response = await api.get('/api/invoices', {
    params: {
      for: 'select',
    },
  })
  invoices.value = response.data.data.invoices
}
// const fetchData = async () => {
//   const [accRes, currRes] = await Promise.all([
//     api.get('/api/accounts'),
//     api.get('/api/currencies', { params: { for: 'select' } })
//   ])
//   accounts.value = accRes.data.data.accounts.data
//   currencies.value = currRes.data.data.currencies
// }

const getReceipt = async () => {
  const response = await api.get(`/api/receipts/${id}`)
  const receipt = response.data.data.receipt
  formBody.value = {
    project_id: receipt.project_id,
    invoice_id: receipt.invoice_id,
    date: receipt.date,
    description: receipt.description,
    amount: receipt.amount,
    original_amount: receipt.original_amount,
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/receipts/${id}`, formBody.value)
    } else {
      await api.post('/api/receipts', formBody.value)
    }
    router.push('/receipts')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getProjects()
  await getInvoices()
  if (isEditMode) await getReceipt()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Receipts</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Receipt</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <label class="form-label">Project</label>
                <v-select
                  :options="projects"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.project_id"
                  :clearable="false"
                  placeholder="Select Project"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Invoice</label>
                <v-select
                  :options="invoices"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.invoice_id"
                  :disabled="isEditMode"
                  :clearable="false"
                  placeholder="Select Invoice"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="date" label="Date" v-model="formBody.date" type="date" />
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
                <FormInput
                  name="amount"
                  label="Amount (PKR)"
                  v-model="formBody.amount"
                  type="number"
                />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="original_amount"
                  label="Original Amount"
                  v-model="formBody.original_amount"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
