<script setup lang="ts">
import api from '@/plugins/axios'
import type { Product } from '@/types/Product'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const product = ref<Product | null>(null)

const getProduct = async () => {
  const response = await api.get(`/api/products/${id}`)
  product.value = response.data.data.product
}

onMounted(getProduct)
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0" v-if="product">
      <h1 class="h3 mb-3">Product Details</h1>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">{{ product.name }}</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>Description</th>
                <td>{{ product.description }}</td>
              </tr>
              <tr>
                <th>Demo URL</th>
                <td>
                  <a :href="product.demo_url ?? undefined" target="_blank">{{
                    product.demo_url
                  }}</a>
                </td>
              </tr>
              <tr>
                <th>Download URL</th>
                <td>
                  <a :href="product.download_url ?? undefined" target="_blank">{{
                    product.download_url
                  }}</a>
                </td>
              </tr>
              <tr>
                <th>Rating</th>
                <td>{{ product.average_rating }} / 5 ({{ product.reviews_count }} reviews)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
