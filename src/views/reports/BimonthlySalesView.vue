<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/plugins/axios'

const bimonthlySales = ref<any[]>([])

const fetchReport = async () => {
  try {
    const response = await api.get('/api/reports/bi-monthly-sales')
    bimonthlySales.value = response.data.bimonthlySales
  } catch (error) {
    console.error('Error fetching report:', error)
  }
}

const totalAmount = computed(() => {
  return bimonthlySales.value.reduce((sum, item) => sum + Number(item.amount), 0)
})

onMounted(() => {
  fetchReport()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Report</h1>

      <div class="row">
        <div class="col-12">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Bimonthly Sales Chart</h5>
            </div>
            <div class="card-body d-flex w-100">
              <div class="align-self-center chart chart-lg">
                <canvas id="chartjs-dashboard-line"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Bimonthly Sales Report</h5>
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
                    <tr v-for="(sale, index) in bimonthlySales" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ sale.label }}</td>
                      <td>{{ sale.amount }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="2" class="text-right">Total</th>
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
