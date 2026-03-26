<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useDataTable } from '@/composables/useDataTable'
import api from '@/plugins/axios'
import type { ProductIndex } from '@/types/Product'
import type { IColumn, PaginationParams } from '@/types/Pagination'
import AppModalDelete from '@/components/AppModalDelete.vue'
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const selectedProduct = ref<ProductIndex | null>(null)
let modalDelete: Modal | null = null

const columns: IColumn<ProductIndex>[] = [
  { label: '#', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Rating', field: 'average_rating' },
  { label: 'Reviews', field: 'reviews_count' },
  { label: 'Actions', field: 'actions' },
]

const getProducts = async (params: PaginationParams) => {
  const response = await api.get('/api/products', { params })
  return response.data.data.products
}

const handleDeleteClick = (product: ProductIndex) => {
  selectedProduct.value = product
  modalDelete!.show()
}

const handleDelete = async () => {
  try {
    await api.delete(`api/products/${selectedProduct.value!.id}`)
    reload()
  } catch {
    alert('Something went wrong')
  }
  modalDelete!.hide()
}

const { pagination, handlePageChange, handleSearchChange, reload } = useDataTable<ProductIndex>({
  fetchFunction: getProducts,
})

onMounted(() => {
  modalDelete = new Modal(document.getElementById('modal-delete')!)
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Products</h1>
      <div class="mb-3 text-end">
        <RouterLink to="/products/create" class="btn btn-success">Add new</RouterLink>
      </div>
      <div class="card">
        <div class="card-body">
          <AppDataTable
            :pagination="pagination"
            @search-change="handleSearchChange"
            @page-change="handlePageChange"
            :columns="columns"
          >
            <template #cell-name="{ row }">
              <RouterLink :to="`/products/${row.id}`">{{ row.name }}</RouterLink>
            </template>
            <template #cell-actions="{ row }">
              <RouterLink :to="`/products/${row.id}/edit`" class="btn btn-info btn-sm me-2"
                >Edit</RouterLink
              >
              <button @click="handleDeleteClick(row)" class="btn btn-danger btn-sm">Delete</button>
            </template>
          </AppDataTable>
        </div>
      </div>
    </div>
  </main>
  <AppModalDelete @onSubmit="handleDelete" />
</template>
