<template>
  <div class="dap-design-system-example">
    <dap-ds-typography variant="h1" size="lg"> DAP Design System Example </dap-ds-typography>

    <dap-ds-card>
      <dap-ds-card-title>Form Example</dap-ds-card-title>
      <dap-ds-card-content>
        <dap-ds-form-label for="name">Name</dap-ds-form-label>
        <dap-ds-input id="name" v-model="formData.name" placeholder="Enter your name" size="md" />

        <dap-ds-form-label for="email">Email</dap-ds-form-label>
        <dap-ds-input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="Enter your email"
          size="md"
        />

        <dap-ds-form-label for="date">Date</dap-ds-form-label>
        <dap-ds-date-picker
          id="date"
          v-model="formData.date"
          placeholder="Select a date"
          size="md"
        />

        <dap-ds-form-label for="product">Product</dap-ds-form-label>
        <dap-ds-select
          id="product"
          v-model="formData.product"
          placeholder="Select a product"
          size="md"
        >
          <dap-ds-option-item value="product1">Product 1</dap-ds-option-item>
          <dap-ds-option-item value="product2">Product 2</dap-ds-option-item>
          <dap-ds-option-item value="product3">Product 3</dap-ds-option-item>
        </dap-ds-select>

        <dap-ds-form-label for="message">Message</dap-ds-form-label>
        <dap-ds-textarea
          id="message"
          v-model="formData.message"
          placeholder="Enter your message"
          size="md"
          :rows="4"
        />

        <dap-ds-checkbox
          id="consent"
          v-model="formData.consent"
          label="I agree to the terms and conditions"
          size="sm"
        />

        <dap-ds-button @click="handleSubmit" variant="primary" size="md" :loading="isSubmitting">
          Submit
        </dap-ds-button>
      </dap-ds-card-content>
    </dap-ds-card>

    <dap-ds-banner
      v-if="showBanner"
      variant="info"
      :opened="showBanner ? 'true' : 'false'"
      @dds-close="showBanner = false"
    >
      This is an informational banner
    </dap-ds-banner>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

interface FormData {
  name: string
  email: string
  date: Dayjs | null
  product: string
  message: string
  consent: boolean
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  date: null,
  product: '',
  message: '',
  consent: false,
})

const isSubmitting = ref(false)
const showBanner = ref(true)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('Form submitted:', formData)
  isSubmitting.value = false

  // Show success message
  showBanner.value = true
}
</script>

<style scoped>
.dap-design-system-example {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

dap-ds-form-label {
  display: block;
  margin-bottom: 0.5rem;
}

dap-ds-input,
dap-ds-date-picker,
dap-ds-select,
dap-ds-textarea {
  margin-bottom: 1rem;
  width: 100%;
}

dap-ds-checkbox {
  margin-bottom: 1rem;
}

dap-ds-button {
  margin-top: 1rem;
}
</style>
