<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'
import vSelect from 'vue-select'

const route = useRoute()
const id = route.params.id
const router = useRouter()
const isEditMode = id ? true : false

const accounts = ref<any[]>([])
const currencies = ref<any[]>([])
const formBody = ref({
  name: '',
  account_id: '',
  currency_id: '',
  amount: '',
  original_amount: '',
  paid: '',
  live_url: '',
  started_at: '',
})

const selectedAccount = computed(() =>
  accounts.value.find((acc: any) => acc.id == formBody.value.account_id),
)
const isPKR = computed(() => selectedAccount.value?.currency?.code === 'PKR')

watch(
  () => formBody.value.amount,
  (newVal) => {
    if (isPKR.value) {
      formBody.value.original_amount = newVal
    }
  },
)

watch(
  () => formBody.value.account_id,
  () => {
    if (isPKR.value) {
      formBody.value.original_amount = formBody.value.amount
    }
  },
)

const getCurrencies = async () => {
  const response = await api.get('/api/currencies', {
    params: {
      for: 'select',
    },
  })
  currencies.value = response.data.data.currencies
}

const getAccounts = async () => {
  const response = await api.get('/api/accounts', {
    params: {
      for: 'select',
    },
  })
  accounts.value = response.data.data.accounts
}

watch(
  () => formBody.value.account_id,
  (newAccountId) => {
    if (newAccountId) {
      const selectedAccount = accounts.value.find((acc: any) => acc.id == newAccountId)
      if (selectedAccount && selectedAccount.currency_id) {
        formBody.value.currency_id = selectedAccount.currency_id
      }
    }
  },
)

const getProject = async () => {
  const response = await api.get(`/api/projects/${id}`)
  const project = response.data.data.project
  formBody.value = {
    name: project.name,
    account_id: project.account_id,
    paid: project.paid,
    live_url: project.live_url,
    original_amount: project.original_amount,
    currency_id: project.currency_id,
    amount: project.amount,
    started_at: project.started_at,
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/projects/${id}`, formBody.value)
    } else {
      await api.post('/api/projects', formBody.value)
    }
    router.push('/projects')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getCurrencies()
  await getAccounts()
  if (isEditMode) await getProject()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Projects</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Project</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <FormInput name="name" label="Project Name" v-model="formBody.name" type="text" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Account</label>
                <v-select
                  :options="accounts"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.account_id"
                  :clearable="false"
                  placeholder="Select Account"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Currency</label>
                <v-select
                  :options="currencies"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.currency_id"
                  :clearable="false"
                  placeholder="Select Currency"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="paid" label="Paid" v-model="formBody.paid" type="number" />
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
                  :disabled="isPKR"
                />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="live_url"
                  label="Live URL"
                  v-model="formBody.live_url"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="started_at"
                  label="Start Date"
                  v-model="formBody.started_at"
                  type="date"
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
