<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

import FormInput from '@/components/form/FormInput.vue'
import vSelect from 'vue-select'

const route = useRoute()
const id = route.params.id
const router = useRouter()

/* data */
const isEditMode = id ? true : false
const currencies = ref<any[]>([])
const accounts = ref<any[]>([])
const formBody = ref({
  name: '',
  person: '',
  original_amount: '',
  currency_id: '',
  amount: '',
  phone: '',
  parent_id: '',
  address: '',
  longitude: '',
  latitude: '',
})

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

const getAccount = async () => {
  const response = await api.get(`/api/accounts/${id}`)
  const acc = response.data.data.account
  formBody.value = {
    name: acc.name,
    person: acc.person,
    original_amount: acc.original_amount,
    currency_id: acc.currency_id,
    amount: acc.amount,
    phone: acc.phone,
    parent_id: acc.parent_id,
    address: acc.address,
    longitude: acc.longitude,
    latitude: acc.latitude,
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
  await getAccounts()
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
                <FormInput
                  name="person"
                  label="Contact Person"
                  v-model="formBody.person"
                  type="text"
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
                <FormInput name="phone" label="Phone" v-model="formBody.phone" type="number" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Parent Company</label>
                <v-select
                  :options="accounts"
                  label="name"
                  :reduce="(option: any) => option.id"
                  v-model="formBody.parent_id"
                  :clearable="true"
                  placeholder="Select Parent Company"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="address" label="Address" v-model="formBody.address" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="longitude"
                  label="Longitude"
                  v-model="formBody.longitude"
                  type="number"
                />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="latitude"
                  label="Latitude"
                  v-model="formBody.latitude"
                  type="number"
                />
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
