<script setup lang="ts">
import type { ChartConfiguration } from 'chart.js'
import { onMounted } from 'vue'

import Chart from '@/plugins/chart'

const props = defineProps<{
  monthlyReceiptsData: any
}>()

onMounted(() => {
  const canvas = document.getElementById('chartjs-dashboard-line') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, 0, 225)
  gradient.addColorStop(0, 'rgba(215, 227, 244, 1)')
  gradient.addColorStop(1, 'rgba(215, 227, 244, 0)')

  const config: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Income (PKR)',
          fill: true,
          backgroundColor: gradient,
          borderColor: window.theme.primary,
          data: props.monthlyReceiptsData,
        },
      ],
    },
    options: {
      responsive: true,
    },
  }
  new Chart(ctx, config)
})
</script>

<template>
  <div class="card flex-fill w-100">
    <div class="card-header">
      <h5 class="card-title mb-0">Receipts by month</h5>
    </div>
    <div class="card-body py-3">
      <div class="chart chart-sm">
        <canvas id="chartjs-dashboard-line"></canvas>
      </div>
    </div>
  </div>
</template>
