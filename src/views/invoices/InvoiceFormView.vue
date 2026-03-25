<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import type { BaseEntity } from '@/types/BaseEntity'

const route = useRoute()
const id = route.params.id
const router = useRouter()
const isEditMode = id ? true : false

const projects = ref<BaseEntity[]>([])
const currencies = ref<BaseEntity[]>([])
const formBody = ref({
  project_id: '',
  currency_id: '',
  date: '',
  due_date: '',
  description: '',
  amount: '',
  status: '',
})

const getCurrencies = async () => {
  const response = await api.get('/api/currencies', {
    params: {
      for: 'select',
    },
  })
  currencies.value = response.data.data.currencies
}

const getProjects = async () => {
  const response = await api.get('/api/projects', {
    params: {
      for: 'select',
    },
  })
  projects.value = response.data.data.projects
}
// const fetchData = async () => {
//   const [accRes, currRes] = await Promise.all([
//     api.get('/api/accounts'),
//     api.get('/api/currencies', { params: { for: 'select' } })
//   ])
//   accounts.value = accRes.data.data.accounts.data
//   currencies.value = currRes.data.data.currencies
// }

const getInvoice = async () => {
  const response = await api.get(`/api/invoices/${id}`)
  const invoice = response.data.data.invoice
  formBody.value = {
    project_id: invoice.project_id,
    currency_id: invoice.currency_id,
    date: invoice.date,
    due_date: invoice.due_date,
    description: invoice.description,
    amount: invoice.amount,
    status: invoice.status,
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/invoices/${id}`, formBody.value)
    } else {
      await api.post('/api/invoices', formBody.value)
    }
    router.push('/invoices')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getCurrencies()
  await getProjects()
  if (isEditMode) await getInvoice()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Invoices</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Invoice</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <FormSelect
                  name="project_id"
                  label="Project"
                  v-model="formBody.project_id"
                  :items="projects"
                />
              </div>
              <div class="col-md-6">
                <FormSelect
                  name="currency_id"
                  label="Currency"
                  v-model="formBody.currency_id"
                  :items="currencies"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="date" label="Date" v-model="formBody.date" type="date" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="due_date"
                  label="Due Date"
                  v-model="formBody.due_date"
                  type="date"
                />
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
              <!-- <div class="col-md-6">
                <FormInput name="status" label="Status" v-model="formBody.status" type="text" />
              </div> -->
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
