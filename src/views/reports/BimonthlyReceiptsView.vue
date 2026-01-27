<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/plugins/axios'

const bimonthlyReceipts = ref<any[]>([])

const fetchReport = async () => {
  try {
    const response = await api.get('/api/reports/bi-monthly-receipts')
    bimonthlyReceipts.value = response.data.bimonthlyReceipts
  } catch (error) {
    console.error('Error fetching report:', error)
  }
}

const totalAmount = computed(() => {
  return bimonthlyReceipts.value.reduce((sum, item) => sum + Number(item.amount), 0)
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
              <h5 class="card-title mb-0">Bimonthly Receipts Chart</h5>
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
                  <!-- <tbody>
                    @php $n = 1; $totalAmount = 0; @endphp @foreach ($bimonthlyReceipts as $i =>
                    $bimonthlyReceipt)
                    <tr>
                      <th scope="row">{{ $n }}</th>
                      <td>{{ $bimonthlyReceipt['label'] }}</td>
                      <td>{{ $bimonthlyReceipt['amount'] }}</td>
                    </tr>
                    @php $n += 1; $totalAmount += $bimonthlyReceipt['amount']; @endphp @endforeach
                  </tbody> -->
                  <tbody>
                    <tr v-for="(receipt, index) in bimonthlyReceipts" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ receipt.label }}</td>
                      <td>{{ receipt.amount }}</td>
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

<!-- @extends('layouts.master') @section('content') @endsection @push('scripts')
<script>
const bimonthlyReceipts = @json($bimonthlyReceipts);

const labels = _.map(bimonthlyReceipts, 'label');
const values = _.map(bimonthlyReceipts, 'amount');

document.addEventListener("DOMContentLoaded", function () {
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
        // Line chart
        new Chart(document.getElementById("chartjs-dashboard-line"), {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Income (PKR)",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: window.theme.primary,
                    data: values,
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    intersect: false
                },
                hover: {
                    intersect: true
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                        reverse: true,
                        gridLines: {
                            color: "rgba(0,0,0,0.0)"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            stepSize: 1000
                        },
                        display: true,
                        borderDash: [3, 3],
                        gridLines: {
                            color: "rgba(0,0,0,0.0)"
                        }
                    }]
                }
            }
        });
    });
</script>
{{--
<script>
const bimonthlyReceipts = @json($bimonthlyReceipts);

const labels = _.map(bimonthlyReceipts, 'label');
const values = _.map(bimonthlyReceipts, 'amount');

document.addEventListener("DOMContentLoaded", function () {
        // Bar chart
        new Chart(document.getElementById("chartjs-dashboard-bar"), {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Amount in PKR",
                    backgroundColor: window.theme.primary,
                    borderColor: window.theme.primary,
                    hoverBackgroundColor: window.theme.primary,
                    hoverBorderColor: window.theme.primary,
                    data: values,
                    barPercentage: .75,
                    categoryPercentage: .5
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        stacked: false,
                        ticks: {
                            stepSize: 20
                        }
                    }],
                    xAxes: [{
                        stacked: false,
                        gridLines: {
                            color: "transparent"
                        }
                    }]
                }
            }
        });
    });
</script>
--}} @endpush -->
