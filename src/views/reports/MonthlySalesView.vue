<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const monthlyInvoices = ref<any[]>([])

const fetchReport = async () => {
  try {
    const response = await api.get('/api/reports/monthly-sales')
    monthlyInvoices.value = response.data.monthlyInvoices
  } catch (error) {
    console.error('Error fetching report:', error)
  }
}

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
              <h5 class="card-title mb-0">Monthly Sales Chart</h5>
            </div>
            <div class="card-body d-flex w-100">
              <div class="align-self-center chart chart-lg">
                <canvas id="chartjs-dashboard-bar"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Monthly Sales Report</h5>
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
                    <tr v-for="(sale, index) in monthlyInvoices" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ sale.month }}</td>
                      <td>{{ sale.amount }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="2" class="text-end">Total</th>
                      <th>
                        {{
                          Object.values(monthlyInvoices).reduce(
                            (sum, item) => sum + Number(item.amount),
                            0,
                          )
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
    </div>
  </main>
</template>
