<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'

const route = useRoute()
const id = route.params.id
const router = useRouter()
const isEditMode = id ? true : false

const projects = ref<any[]>([])
const formBody = ref({
  project_id: '',
  name: '',
  url: '',
  provider: '',
})


const getProjects = async () => {
  const response = await api.get('/api/projects', {
    params: {
      for: 'select'
    }
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

const getRepository = async () => {
  const response = await api.get(`/api/repositories/${id}`)
  const repository = response.data.data.repository
  formBody.value = {
    project_id: repository.project_id,
    name: repository.name,
    url: repository.url,
    provider: repository.provider
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode) {
      await api.put(`/api/repositories/${id}`, formBody.value)
    } else {
      await api.post('/api/repositories', formBody.value)
    }
    router.push('/repositories')
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getProjects()
  if (isEditMode) await getRepository()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Repositories</h1>
      <div class="card">
        <form @submit.prevent="handleSubmit">
          <div class="card-header"><h5 class="card-title mb-0">{{ isEditMode ? 'Edit' : 'Add' }} Repository</h5></div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6"><FormSelect name="project_id" label="Project" v-model="formBody.project_id" :items="projects" :disabled="isEditMode" /></div>
              <div class="col-md-6"><FormInput name="name" label="Name" v-model="formBody.name" type="text" /></div>
              <div class="col-md-6"><FormInput name="url" label="URL" v-model="formBody.url" type="text" /></div>
              <div class="col-md-6"><FormInput name="provider" label="Provider" v-model="formBody.provider" type="text" /></div>
            </div>
          </div>
          <div class="card-footer text-end"><button type="submit" class="btn btn-primary">Save</button></div>
        </form>
      </div>
    </div>
  </main>
</template>
