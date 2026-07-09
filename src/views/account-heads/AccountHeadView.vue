<script setup lang="ts">
import api from '@/plugins/axios'
import type { AccountHead } from '@/types/AccountHead'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/dateFormat'

const route = useRoute()
const id = route.params.id

const accountHead = ref<AccountHead | null>(null)

const getAccountHead = async () => {
  const response = await api.get(`/api/account-heads/${id}`)
  accountHead.value = response.data.data.accountHead
}

onMounted(async () => {
  await getAccountHead()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Account Head</h1>

      <div class="row" v-if="accountHead">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">{{ accountHead.name }}</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th style="width: 250px">ID</th>
                      <td>{{ accountHead.id }}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td>{{ accountHead.name }}</td>
                    </tr>
                    <tr>
                      <th>Created At</th>
                      <td>{{ formatDate(accountHead.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
