<script setup lang="ts">
import api from '@/plugins/axios'
import type { Receipt } from '@/types/Receipt'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const receipt = ref<Receipt | null>(null)

const getReceipt = async () => {
  const response = await api.get(`/api/receipts/${id}`)
  receipt.value = response.data.data.receipt
}

onMounted(async () => {
  await getReceipt()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Receipt</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">{{ receipt?.id }}</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th>Project ID</th>
                      <td>{{ receipt?.project?.name }}</td>
                    </tr>
                    <tr>
                      <th>Invoice ID</th>
                      <td>{{ receipt?.invoice_id }}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{{ receipt?.date }}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{{ receipt?.description }}</td>
                    </tr>
                    <tr>
                      <th>Amount in PKR</th>
                      <td>{{ receipt?.amount }}</td>
                    </tr>
                    <tr>
                      <th>Original Amount</th>
                      <td>{{ receipt?.original_amount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Projects</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Original Amount Earned</th>
                      <th>Amount in PKR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in account?.projects" :key="project.id">
                      <th>{{ project.id }}</th>
                      <td>
                        <RouterLink :to="`/projects/${project.id}`">
                          {{ project.name }}
                        </RouterLink>
                      </td>
                      <td>{{ project.original_amount }} {{ account.currency }}</td>
                      <td>{{ project.paid }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="2" class="text-end">Total</th>
                      <th>
                        {{
                          account?.projects.reduce(
                            (sum: number, p: any) => sum + Number(p.original_amount),
                            0,
                          )
                        }}
                      </th>
                      <th>
                        {{
                          account?.projects.reduce((sum: number, p: any) => sum + Number(p.paid), 0)
                        }}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Receipts</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Project</th>
                      <th>Description</th>
                      <th>Original Amount Earned</th>
                      <th>Amount in PKR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(receipt, i) in receipts" :key="receipt.id">
                      <th>{{ i + 1 }}</th>
                      <td>{{ receipt.date }}</td>
                      <td>{{ receipt.project?.name }}</td>
                      <td>{{ receipt.invoice?.description }}</td>
                      <td>{{ receipt.original_amount }} {{ account.currency }}</td>
                      <td>{{ receipt.amount }}</td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </main>
</template>

<!-- <tfoot>
                    <tr>
                      <th colspan="4" class="text-end">Total</th>
                      <th>{{ $receipts->sum('original_amount') }}</th>
                      <th>{{ $receipts->sum('amount') }}</th>
                    </tr>
                  </tfoot> -->
