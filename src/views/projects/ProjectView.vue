<script setup lang="ts">
import api from '@/plugins/axios'
import type { Project } from '@/types/Project'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const project = ref<Project | null>(null)

const getProject = async () => {
  const response = await api.get(`/api/projects/${id}`)
  project.value = response.data.data.project
}

onMounted(async () => {
  await getProject()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0" v-if="project">
      <h1 class="h3 mb-3">Project</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">{{ project.name }}</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{{ project?.name }}</td>
                    </tr>
                    <tr>
                      <th>Account ID</th>
                      <td>{{ project.account?.name }}</td>
                    </tr>
                    <tr>
                      <th>Currency ID</th>
                      <td>{{ project.currency_id }}</td>
                    </tr>
                    <!-- <tr>
                      <th>Currency</th>
                      <td>{{ project?.currency }}</td>
                    </tr> -->
                    <tr>
                      <th>Original Amount Earned</th>
                      <td>
                        {{ Number(project.original_amount).toLocaleString() }}
                        {{ project.currency.code }}
                      </td>
                    </tr>
                    <tr>
                      <th>Amount in PKR</th>
                      <td>{{ Number(project.amount).toLocaleString() }} PKR</td>
                    </tr>
                    <tr>
                      <th>Paid</th>
                      <td>{{ Number(project.paid).toLocaleString() }} PKR</td>
                    </tr>
                    <tr>
                      <th>Paid</th>
                      <td>{{ Number(project.paid).toLocaleString() }} PKR</td>
                    </tr>
                    <tr>
                      <th>Is Available</th>
                      <td>{{ project?.is_available }}</td>
                    </tr>
                    <tr>
                      <th>Is Duplicable</th>
                      <td>{{ project?.is_duplicable }}</td>
                    </tr>
                    <tr>
                      <th>Is Sellable</th>
                      <td>{{ project?.is_sellable }}</td>
                    </tr>
                    <tr>
                      <th>Live URL</th>
                      <td>{{ project?.live_url }}</td>
                    </tr>
                    <tr>
                      <th>Demo URL</th>
                      <td>{{ project?.demo_url }}</td>
                    </tr>
                    <tr>
                      <th>Is Live</th>
                      <td>{{ project?.is_live }}</td>
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
