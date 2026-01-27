<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { useAuthStore } from '@/stores/authStore'
import api from '@/plugins/axios'
import { formatDate } from '@/utils/dateFormat'

// const authStore = useAuthStore()
// const authUser = authStore.user!

const isViewReady = ref<boolean>(false)
const homeContent = ref<any>([])

const getHomeContent = async () => {
  try {
    const response = await api.get('/api/dashboard')
    homeContent.value = response.data.data
    console.log(homeContent.value)
  } catch (error) {
    console.error('Error fetching home content:', error)
  }
}

const getFirstThreeAccounts = () => {
  return Object.entries(homeContent.value.accounts || {})
    .slice(0, 3)
    .map(([name, amount]) => ({
      name,
      amount,
    }))
}

onMounted(async () => {
  getHomeContent()
  isViewReady.value = true
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0" v-if="isViewReady">
      <div class="row mb-2 mb-xl-3">
        <div class="col-auto d-none d-sm-block">
          <h3><strong>Analytics</strong> Dashboard</h3>
        </div>

        <div class="col-auto ms-auto text-end mt-n1">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent p-0 mt-1 mb-0">
              <li class="breadcrumb-item"><a href="#">MSBandukda</a></li>
              <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
              <li class="breadcrumb-item active" aria-current="page">Analytics</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-xxl-5 d-flex">
          <div class="w-100">
            <div class="row">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Clients</h5>
                    <h1 class="mt-1 mb-3">{{ homeContent.clientsCount }}</h1>
                    <div class="mb-1">
                      <span class="text-danger">
                        <i class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span
                      >
                      <span class="text-muted">&nbsp;</span>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Projects</h5>
                    <h1 class="mt-1 mb-3">{{ homeContent.projectsCount }}</h1>
                    <div class="mb-1">
                      <span class="text-success">
                        <i class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span
                      >
                      <span class="text-muted">&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Pending invoices</h5>
                    <h1 class="mt-1 mb-3">{{ homeContent.pendingInvoicesCount }}</h1>
                    <div class="mb-1">
                      <span class="text-success">
                        <i class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span
                      >
                      <span class="text-muted">&nbsp;</span>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Pending income</h5>
                    <h1 class="mt-1 mb-3">{{ homeContent.pendingIncome }}</h1>
                    <div class="mb-1">
                      <span class="text-danger">
                        <i class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span
                      >
                      <span class="text-muted">&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-xxl-7">
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
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Revenue by companies</h5>
            </div>
            <div class="card-body d-flex">
              <div class="align-self-center w-100">
                <div class="py-3">
                  <div class="chart chart-xs">
                    <canvas id="chartjs-dashboard-pie"></canvas>
                  </div>
                </div>

                <table class="table mb-0">
                  <tbody>
                    <tr v-for="(account, i) in getFirstThreeAccounts()" :key="account.name">
                      <td>
                        {{ account.name }}
                      </td>
                      <td class="text-end">{{ account.amount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
          <div class="card flex-fill">
            <div class="card-header">
              <h5 class="card-title mb-0">Latest Receipts</h5>
            </div>
            <table class="table table-hover my-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th class="d-none d-md-table-cell">Account</th>
                  <th class="d-none d-xl-table-cell">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invoice in homeContent.invoices" :key="invoice.id">
                  <td>{{ formatDate(invoice.date) }}</td>

                  <td class="d-none d-xl-table-cell">
                    {{ invoice.project.account.name }}
                  </td>

                  <td class="d-none d-xl-table-cell">
                    {{ invoice.amount }} {{ invoice.project.account.currency }}
                  </td>

                  <td>
                    <span
                      :class="['badge', invoice.status === 'paid' ? 'bg-success' : 'bg-warning']"
                    >
                      {{ invoice.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Monthly Sales</h5>
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
        <div class="col-12 col-lg-12 col-xxl-12 d-flex">
          <div class="card flex-fill w-100">
            <div class="card-header">
              <h5 class="card-title mb-0">Clients map</h5>
            </div>
            <div class="card-body px-4">
              <div id="world_map" style="height: 350px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<!--


<main class="content">
    <div class="container-fluid p-0">

        <div class="row mb-2 mb-xl-3">
            <div class="col-auto d-none d-sm-block">
                <h3><strong>Analytics</strong> Dashboard</h3>
            </div>

            <div class="col-auto ms-auto text-end mt-n1">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent p-0 mt-1 mb-0">
                        <li class="breadcrumb-item"><a href="#">MSBandukda</a></li>
                        <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Analytics</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-xxl-5 d-flex">
                <div class="w-100">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">Clients</h5>
                                    <h1 class="mt-1 mb-3">{{ $clientsCount }}</h1>
                                    <div class="mb-1">
                                        <span class="text-danger"> <i
                                                class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span>
                                        <span class="text-muted">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">Projects</h5>
                                    <h1 class="mt-1 mb-3">{{ $projectsCount }}</h1>
                                    <div class="mb-1">
                                        <span class="text-success"> <i
                                                class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span>
                                        <span class="text-muted">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">Pending invoices</h5>
                                    <h1 class="mt-1 mb-3">{{ $pendingInvoicesCount }}</h1>
                                    <div class="mb-1">
                                        <span class="text-success"> <i
                                                class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span>
                                        <span class="text-muted">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-4">Pending income</h5>
                                    <h1 class="mt-1 mb-3">{{ $pendingIncome }}</h1>
                                    <div class="mb-1">
                                        <span class="text-danger"> <i
                                                class="mdi mdi-arrow-bottom-right"></i>&nbsp;</span>
                                        <span class="text-muted">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6 col-xxl-7">
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
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                <div class="card flex-fill w-100">
                    <div class="card-header">

                        <h5 class="card-title mb-0">Revenue by companies</h5>
                    </div>
                    <div class="card-body d-flex">
                        <div class="align-self-center w-100">
                            <div class="py-3">
                                <div class="chart chart-xs">
                                    <canvas id="chartjs-dashboard-pie"></canvas>
                                </div>
                            </div>

                            <table class="table mb-0">
                                <tbody>
                                    @foreach ($accounts->take(3)  as $name => $value)
                                    <tr>
                                        <td>{{ $name }}</td>
                                        <td class="text-end">{{ $value }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
                <div class="card flex-fill">
                    <div class="card-header">

                        <h5 class="card-title mb-0">Latest Receipts</h5>
                    </div>
                    <table class="table table-hover my-0">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th class="d-none d-md-table-cell">Account</th>
                                <th class="d-none d-xl-table-cell">Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            @foreach ($invoices as $invoice)
                            @php
                                $class = 'bg-warning';
                                if($invoice->status == 'paid')
                                    $class = 'bg-success';
                            @endphp
                            <tr>
                                <td>{{ $invoice->date->format('d-m-Y') }}</td>
                                <td class="d-none d-xl-table-cell">{{ $invoice->project->account->name }}</td>
                                <td class="d-none d-xl-table-cell">{{ $invoice->amount.' '.$invoice->project->account->currency }}</td>
                                <td><span class="badge {{$class}}">{{ $invoice->status }}</span></td>
                            </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                <div class="card flex-fill w-100">
                    <div class="card-header">

                        <h5 class="card-title mb-0">Monthly Sales</h5>
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
            <div class="col-12 col-lg-12 col-xxl-12 d-flex">
                <div class="card flex-fill w-100">
                    <div class="card-header">

                        <h5 class="card-title mb-0">Clients map</h5>
                    </div>
                    <div class="card-body px-4">
                        <div id="world_map" style="height:350px;"></div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</main>

@endsection @push('scripts')
<script>
const monthlyReceipts = @json($monthlyReceipts);
const monthlyReceiptsData = [];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
labels.forEach((label, i)=>{
    const val = monthlyReceipts[label] ? monthlyReceipts[label] : 0;
    monthlyReceiptsData.push(val);
});

document.addEventListener("DOMContentLoaded", function () {
        var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
        // Line chart
        new Chart(document.getElementById("chartjs-dashboard-line"), {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Income (PKR)",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: window.theme.primary,
                    data: monthlyReceiptsData,
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
<script>
const accounts = @json($accounts);
const values = Object.values(accounts);
// let sum=0;

// for (let index = 0; index < values.length; index++) {
//     const value = values[index];
//     sum += value;
// }

// for (let index = 0; index < values.length; index++) {
//     const value = values[index];
//     const p = (value/sum) * 100;
//     // values[index] = `${value} (${p}%)`;
// }

document.addEventListener("DOMContentLoaded", function () {
        // Pie chart
        new Chart(document.getElementById("chartjs-dashboard-pie"), {
            type: "pie",
            data: {
                labels: Object.keys(accounts),
                datasets: [{
                    label: "Income (PKR)",
                    data: values,
                    backgroundColor: [
                        window.theme.primary,
                        window.theme.warning,
                        window.theme.danger
                    ],
                    borderWidth: 5
                }]
            },
            options: {
                responsive: !window.MSInputMethodContext,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                cutoutPercentage: 75,
            }
        });
    });
</script>
<script>
const monthlySales = @json($monthlySales);

document.addEventListener("DOMContentLoaded", function () {
        // Bar chart
        new Chart(document.getElementById("chartjs-dashboard-bar"), {
            type: "bar",
            data: {
                labels: _.map(monthlySales, 'month'),
                datasets: [{
                    label: "This month",
                    backgroundColor: window.theme.primary,
                    borderColor: window.theme.primary,
                    hoverBackgroundColor: window.theme.primary,
                    hoverBorderColor: window.theme.primary,
                    data: _.map(monthlySales, 'amount'),
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
<script>
document.addEventListener("DOMContentLoaded", function () {
    const markers = [];
    const m = @json($markers);
    m.forEach(element => {
        markers.push({
            coords: [element.latitude, element.longitude],
            name: `${element.name} - ${element.address}`,
        });
    });

        // var markers = [{
        //     coords: [31.230391, 121.473701],
        //     name: "Shanghai"
        // },
        // {
        //     coords: [28.704060, 77.102493],
        //     name: "Delhi"
        // },
        // {
        //     coords: [6.524379, 3.379206],
        //     name: "Lagos"
        // },
        // {
        //     coords: [35.689487, 139.691711],
        //     name: "Tokyo"
        // },
        // {
        //     coords: [23.129110, 113.264381],
        //     name: "Guangzhou"
        // },
        // {
        //     coords: [40.7127837, -74.0059413],
        //     name: "New York"
        // },
        // {
        //     coords: [34.052235, -118.243683],
        //     name: "Los Angeles"
        // },
        // {
        //     coords: [41.878113, -87.629799],
        //     name: "Chicago"
        // },
        // {
        //     coords: [51.507351, -0.127758],
        //     name: "London"
        // },
        // {
        //     coords: [40.416775, -3.703790],
        //     name: "Madrid "
        // }
        // ];
        var map = new jsVectorMap({
            map: "world",
            selector: "#world_map",
            zoomButtons: true,
            markers: markers,
            markerStyle: {
                initial: {
                    r: 9,
                    strokeWidth: 7,
                    stokeOpacity: .4,
                    fill: window.theme.primary
                },
                hover: {
                    fill: window.theme.primary,
                    stroke: window.theme.primary
                }
            }
        });
        window.addEventListener("resize", () => {
            map.updateSize();
        });
    });
</script>
@endpush -->
