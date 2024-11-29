<template>
  <main>
    <h2>Form</h2>
    <form @submit.prevent="handleSubmit">
      <h2>Sign Up Form</h2>
      <dap-ds-stack>
        <dap-ds-input
          @dds-change="firstNameChange"
          v-model="formData.firstName"
          placeholder="First Name"
        ></dap-ds-input>
        <dap-ds-input v-model="formData.lastName" placeholder="Last Name"></dap-ds-input>
        <dap-ds-input v-model="formData.email" placeholder="Email"></dap-ds-input>
        <dap-ds-button @click="handleSubmit()">Submit</dap-ds-button>
      </dap-ds-stack>
    </form>
  </main>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log('Form Data:', this.formData)
    },
    firstNameChange() {
      // This runs when focus changed after typing
      console.log('First name has been changed!')
    },
  },
}
</script>

<style scoped></style>
