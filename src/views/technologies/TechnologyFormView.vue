<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isEditMode = !!id

const formBody = ref({ name: '', order_no: 0 })

const getTech = async () => {
  const response = await api.get(`/api/technologies/${id}`)
  const t = response.data.data.technology
  formBody.value = { name: t.name, order_no: t.order_no || 0 }
}

const handleSubmit = async () => {
  try {
    isEditMode
      ? await api.put(`/api/technologies/${id}`, formBody.value)
      : await api.post('/api/technologies', formBody.value)
    router.push('/technologies')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (isEditMode) getTech()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Technologies</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Technology</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <FormInput name="name" label="Name" v-model="formBody.name" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="order_no"
                  label="Order No"
                  v-model="formBody.order_no"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
