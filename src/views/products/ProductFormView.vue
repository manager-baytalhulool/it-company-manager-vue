<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const isEditMode = !!id

const formBody = ref({
  name: '',
  description: '',
  demo_url: '',
  download_url: '',
})

const getProduct = async () => {
  const response = await api.get(`/api/products/${id}`)
  const p = response.data.data.product
  formBody.value = {
    name: p.name,
    description: p.description || '',
    demo_url: p.demo_url || '',
    download_url: p.download_url || '',
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/products/${id}`, formBody.value)
    } else {
      await api.post('/api/products', formBody.value)
    }
    router.push('/products')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (isEditMode) getProduct()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Products</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header">
            <h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Product</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <FormInput name="name" label="Product Name" v-model="formBody.name" type="text" />
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="formBody.description" rows="3"></textarea>
              </div>
              <div class="col-md-6">
                <FormInput
                  name="demo_url"
                  label="Demo URL"
                  v-model="formBody.demo_url"
                  type="text"
                />
              </div>
              <div class="col-md-6">
                <FormInput
                  name="download_url"
                  label="Download URL"
                  v-model="formBody.download_url"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
