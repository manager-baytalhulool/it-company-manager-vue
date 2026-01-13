<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const authUser = authStore.user!

const isViewReady = ref<boolean>(false)

onMounted(async () => {
  isViewReady.value = true
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0" v-if="isViewReady">
      <h1 class="h3 mb-3">
        <strong>{{ authUser.name }}</strong>
      </h1>
    </div>
  </main>
</template>
