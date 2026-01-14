<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'

const route = useRoute()
const id = route.params.id
const router = useRouter()

/* data */
const isEditMode = id ? true : false
const currencies = ref<any[]>([])
const formBody = ref({
  name: '',
  person: '',
  original_amount: '',
  currency_id: '',
  amount: ''
})

const getCurrencies = async () => {
  const response = await api.get('/api/currencies', {
    params: {
      for: 'select'
    }
  })
  currencies.value = response.data.data.currencies
}

const getAccount = async () => {
  const response = await api.get(`/api/accounts/${id}`)
  const acc = response.data.data.account
  formBody.value = {
    name: acc.name,
    person: acc.person,
    original_amount: acc.original_amount,
    currency_id: acc.currency_id,
    amount: acc.amount
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/accounts/${id}`, formBody.value)
    } else {
      await api.post('/api/accounts', formBody.value)
    }
    router.push('/accounts')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getCurrencies()
  if (isEditMode) await getAccount()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Accounts</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add New' }} Account</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <FormInput name="name" label="Account Name" v-model="formBody.name" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput name="person" label="Contact Person" v-model="formBody.person" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput name="original_amount" label="Original Amount Earned" v-model="formBody.original_amount" type="number" />
              </div>
              <div class="col-md-6">
                <FormSelect name="currency_id" label="Currency" v-model="formBody.currency_id" :items="currencies" />
              </div>
              <div class="col-12">
                <FormInput name="amount" label="Amount" v-model="formBody.amount" type="number" />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Account</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
