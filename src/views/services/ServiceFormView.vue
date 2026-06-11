<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isEditMode = !!id

const formBody = ref({ name: '', description: '', order_no: 0, icon: '', color: '' })

const getService = async () => {
  const response = await api.get(`/api/services/${id}`)
  const s = response.data.data.service
  formBody.value = {
    name: s.name,
    description: s.description || '',
    order_no: s.order_no || 0,
    icon: s.icon || '',
    color: s.color || '',
  }
}

const handleSubmit = async () => {
  try {
    isEditMode
      ? await api.put(`/api/services/${id}`, formBody.value)
      : await api.post('/api/services', formBody.value)
    router.push('/services')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (isEditMode) getService()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Services</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Service</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <FormInput name="name" label="Service Name" v-model="formBody.name" type="text" />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="order_no"
                  label="Order No"
                  v-model="formBody.order_no"
                  type="number"
                />
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label">Description</label
                ><textarea class="form-control" v-model="formBody.description" rows="3"></textarea>
              </div>
              <div class="col-md-6">
                <FormInput
                  name="icon"
                  label="Icon Identifier"
                  v-model="formBody.icon"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <FormInput name="color" label="Color Theme" v-model="formBody.color" type="text" />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Service</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
