<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <dap-ds-stack>
        <dap-ds-input
          @dds-change="firstNameChange"
          v-model="formData.fullName"
          feedbackType="negative"
          label="Teljes név"
        ></dap-ds-input>
        <dap-ds-select
          label="Megnevezés"
          v-model="formData.title"
          required
          feedbackType="negative"
        >
          <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
          <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
          <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
        </dap-ds-select>
        <dap-ds-input
          v-model="formData.email"
          placeholder="Email"
          required
          label="E-mail cím"
          feedbackType="negative"
        ></dap-ds-input>
        <dap-ds-datepicker
            v-model="formData.birthDate"
            feedbackType="negative"
            required
            label="Születési dátum"
            description="Add meg a születési dátumod!"
        ></dap-ds-datepicker>

        <dap-ds-combobox
          v-model="formData.product"
          label="Termék megnevezés"
          required
          sync
          feedbackType="negative"
          placeholder="Válassz egy terméket"
        >
        </dap-ds-combobox>
        <dap-ds-input
          v-model="formData.subject"
          label="Tárgy"
          optional
          optionalLabel="(Nem kötelező)"
        ></dap-ds-input>
        <dap-ds-textarea
          v-model="formData.message"
          required
          feedbackType="negative"
          label="Üzenet"
        ></dap-ds-textarea>
        <dap-ds-checkbox
          v-model="formData.consent"
          required
          feedbackType="negative"
          label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
        ></dap-ds-checkbox>
        <dap-ds-button @click="handleSubmit()">Küldés</dap-ds-button>
      </dap-ds-stack>
    </form>
  </main>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formData: {
        fullName: '',
        title: '',
        email: '',
        birthDate: '',
        product: '',
        subject: '',
        message: '',
        consent: false,
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
