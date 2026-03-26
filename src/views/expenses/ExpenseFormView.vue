<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

import FormInput from '@/components/form/FormInput.vue'

const route = useRoute()
const id = route.params.id
const router = useRouter()

const isEditMode = id ? true : false

const formBody = ref({
  description: '',
  amount: '',
})

const getExpense = async () => {
  const response = await api.get(`/api/expenses/${id}`)
  const expense = response.data.data.expense
  formBody.value = {
    description: expense.description,
    amount: expense.amount,
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/expenses/${id}`, formBody.value)
    } else {
      await api.post('/api/expenses', formBody.value)
    }
    router.push('/expenses')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if (isEditMode) await getExpense()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Expenses</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add New' }} Expense</h5>
          </div>
          <div class="card-body">
            <div class="row">
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
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Expense</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
