<script setup lang="ts">
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import api from '@/plugins/axios'
import FormInput from '@/components/form/FormInput.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import type { Invoice } from '@/types/Invoice'
import type { Project } from '@/types/Project'

const props = defineProps<{
  action?: string
  invoice?: Invoice
  projects?: Project[]
  receipt?: any
}>()

const emit = defineEmits(['onSubmit'])

const formData = ref({
  date: dayjs().format('YYYY-MM-DD'),
  project_id: '',
  invoice_id: '',
  description: '',
  original_amount: 0,
  amount: 0,
})

const populateForm = () => {
  if (props.invoice) {
    formData.value.invoice_id = props.invoice.id.toString()
    formData.value.project_id = props.invoice.project_id.toString()
    formData.value.original_amount = props.invoice.amount
    formData.value.amount = props.invoice.amount
  }

  if (props.receipt) {
    formData.value = {
      date: dayjs(props.receipt.date).format('YYYY-MM-DD'),
      project_id: props.receipt.project_id.toString(),
      invoice_id: props.receipt.invoice_id.toString(),
      description: props.receipt.description,
      original_amount: props.receipt.original_amount,
      amount: props.receipt.amount,
    }
  }
}

const handleSubmit = async () => {
  try {
    const payload = {
      ...formData.value,
      project_id: parseInt(formData.value.project_id),
      invoice_id: parseInt(formData.value.invoice_id),
    }

    if (props.receipt) {
      await api.put(`${props.action}/${props.receipt.id}`, payload)
    } else {
      await api.post(props.action || '/api/receipts', payload)
    }

    emit('onSubmit')
  } catch (error) {
    console.error('Error saving receipt:', error)
    alert('Something went wrong')
  }
}

onMounted(() => {
  populateForm()
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="row mb-3">
      <div class="col-md-6">
        <FormInput name="date" label="Date" v-model="formData.date" type="date" />
      </div>
      <div class="col-md-6">
        <FormSelect
          name="project_id"
          label="Project"
          v-model="formData.project_id"
          :items="projects || []"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <FormInput
          name="description"
          label="Description"
          v-model="formData.description"
          type="text"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <FormInput
          name="original_amount"
          :label="`Original Amount (${props.invoice?.currency?.code || props.receipt?.project?.currency?.code || ''})`"
          v-model="formData.original_amount"
          type="number"
        />
      </div>
      <div class="col-md-6">
        <FormInput name="amount" label="Amount (PKR)" v-model="formData.amount" type="number" />
      </div>
    </div>
    <div class="row">
      <div class="col text-end">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </div>
  </form>
</template>
