<!-- <script setup lang="ts">
document.getElementById('btn-print').addEventListener('click', () => {
  const printContents = document.getElementById('printable').innerHTML
  const originalContents = document.body.innerHTML

  document.body.innerHTML = printContents

  window.print()

  document.body.innerHTML = originalContents
})
</script> -->

<script setup lang="ts">
import api from '@/plugins/axios'
import type { Invoice } from '@/types/Invoice'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/dateFormat'

const route = useRoute()
const id = route.params.id

const invoice = ref<Invoice>({} as Invoice)
const isViewReady = ref(false)

const getInvoice = async () => {
  const response = await api.get(`/api/invoices/${id}`)
  invoice.value = response.data.data.invoice
}

const printInvoice = () => {
  const printContents = document.getElementById('printable')!.innerHTML
  const originalContents = document.body.innerHTML

  document.body.innerHTML = printContents

  window.print()

  document.body.innerHTML = originalContents
}

onMounted(async () => {
  isViewReady.value = true
  await getInvoice()
})
</script>

<template>
  <main class="content" v-if="isViewReady">
    <div class="container-fluid p-0">
      <h1 class="h3 mb-3">Invoice # {{ invoice.id }}</h1>

      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="printInvoice">Print</button>
      </div>

      <div class="row">
        <div class="col-12" id="printable">
          <div class="card">
            <div class="card-body m-sm-3 m-md-5">
              <div class="mb-3 text-center">
                <h3>Invoice</h3>
              </div>
              <div class="mb-3 text-center">
                <h1>MS Bandukda</h1>
                <p class="m-0">Karachi</p>
                <p class="m-0">Pakistan</p>
                <p>+92 322 2184035</p>
              </div>
              <!-- {{--
              <div class="row">
                <div class="col-md-6">
                  <div class="text-muted">Invoice No.</div>
                  <strong>1</strong>
                </div>
                <div class="col-md-6 text-md-end">
                  <div class="text-muted">Payment Date</div>
                  <strong>12th April, 2021</strong>
                </div>
              </div>
              <hr class="my-4" />
              --}} -->
              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="text-muted">
                    Bill to
                    <strong>
                      {{ invoice.project.account.name }}
                    </strong>
                  </div>
                  <div>
                    <p>{{ invoice.project.account.address }}</p>
                    <a href="#"></a>
                  </div>
                </div>
                <div class="col-md-6 text-md-end">
                  <div class="text-muted">
                    Invoice No. <strong>{{ invoice.id }}</strong>
                  </div>
                  <div class="text-muted">
                    Invoice Date. <strong>{{ formatDate(invoice.date) }}</strong>
                  </div>
                  <div class="text-muted">
                    Due Date. <strong>{{ formatDate(invoice.due_date) }}</strong>
                  </div>
                </div>
              </div>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th class="text-end">Price</th>
                    <th class="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ invoice.description }}</td>
                    <td class="text-end">
                      {{ invoice.project.account.currency }} {{ invoice.amount }}
                    </td>
                    <td class="text-end">
                      {{ invoice.project.account.currency }} {{ invoice.amount }}
                    </td>
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Subtotal</th>
                    <th class="text-end">
                      {{ invoice.project.account.currency }} {{ invoice.amount }}
                    </th>
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Total</th>
                    <th class="text-end">
                      {{ invoice.project.account.currency }} {{ invoice.amount }}
                    </th>
                  </tr>
                </tbody>
              </table>

              <div class="row mt-4">
                <div class="col">
                  <h3>Payment details</h3>
                  <div class="text-muted">Bank: <strong>Habib Bank Limited</strong></div>
                  <div class="text-muted">Account title: <strong>Muhammad Saifullah</strong></div>
                  <div class="text-muted">Iban: <strong>PK17 HABB 0024907000093103</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- <script setup lang="ts"></script>

<template>
  <div></div>
</template> -->
