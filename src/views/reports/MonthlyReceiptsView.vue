<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const currentYearMonthlyReceipts = ref<Record<string, number>>({})
const months = ref<string[]>([])
const totalAmount = ref(0)

const getMonthlyReceipts = async () => {
  try {
    const response = await api.get('/api/reports/monthly-receipts')
    currentYearMonthlyReceipts.value = response.data.currentYearMonthlyReceipts
    months.value = response.data.months

    totalAmount.value = Object.values(currentYearMonthlyReceipts.value).reduce(
      (sum, val) => sum + Number(val),
      0,
    )
  } catch (error) {
    console.error('Error fetching monthly receipts:', error)
  }
}

onMounted(() => {
  getMonthlyReceipts()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Report</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Monthly Receipts Report</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Month</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(month, index) in months" :key="month">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ month }}</td>
                      <td>
                        {{ currentYearMonthlyReceipts[month] || 0 }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="2" class="text-end">Total</th>
                      <th>{{ totalAmount }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
