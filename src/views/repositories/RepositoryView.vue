<script setup lang="ts">
import api from '@/plugins/axios'
import type { Repository } from '@/types/Repository'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const repository = ref<Repository | null>(null)

const getRepository = async () => {
  const response = await api.get(`/api/repositories/${id}`)
  repository.value = response.data.data.repository
}

onMounted(async () => {
  await getRepository()
})
</script>

<template>
  <main class="content">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Repository</h1>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">{{ repository?.name }}</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{{ repository?.name }}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>
                        {{
                          repository?.repositable_type === 'App\\Models\\Project'
                            ? 'Project'
                            : 'Product'
                        }}
                      </td>
                    </tr>
                    <tr>
                      <th>Parent Name</th>
                      <td>{{ repository?.repositable?.name || 'N/A' }}</td>
                    </tr>
                    <tr>
                      <th>URL</th>
                      <td>{{ repository?.url }}</td>
                    </tr>
                    <tr>
                      <th>Provider</th>
                      <td>{{ repository?.provider }}</td>
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
