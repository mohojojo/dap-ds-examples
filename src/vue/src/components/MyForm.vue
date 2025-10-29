<template>
  <main>
    <dap-ds-snackbar></dap-ds-snackbar>
    <dap-ds-icon-information-line />
    <dap-ds-icon-account-circle-fill />
    <form @submit.prevent="handleSubmit">
      <dap-ds-stack>
        <dap-ds-input
          loading
          tooltip="Ez egy információs üzenet"
          label="Név"
          description="Ez egy leírás"
        >
        </dap-ds-input>

        <dap-ds-button @click="handleSubmit()">Küldés</dap-ds-button>
      </dap-ds-stack>
    </form>
  </main>
</template>

<script lang="ts">
type FormEvent = { detail: { value: string } } | undefined
type ProductSearchEvent = { detail: { input: string } } | undefined
type ProductSelectedEvent = { detail: { value: string } } | undefined
type ConsentEvent = { detail: { checked: boolean } } | undefined

type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
}

type SearchResult = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

type FormData = {
  fullName: string
  title: string
  email: string
  birthDate: string
  product: string
  subject: string
  message: string
  consent: boolean
}

type FormKeys = keyof FormData

export default {
  data() {
    return {
      timeOutId: 0,
      submitted: false,
      products: [] as Product[],
      searchResult: {} as SearchResult,
      formData: {
        fullName: '',
        title: '',
        email: '',
        birthDate: '',
        product: '',
        subject: '',
        message: '',
        consent: false,
      } as FormData,
    }
  },
  methods: {
    getProducts: async (filter: string) => {
      const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`)
      const json = await response.json()
      return json.products.filter((item: { title: string }) =>
        item.title.toLowerCase().startsWith(filter.toLowerCase()),
      )
    },
    handleSubmit() {
      this.submitted = true
      console.log('Form Data:', this.formData)
      // if (window.showDapSnackbar) {
      //   window.showDapSnackbar('Gratulálunk! Minden mező helyes!', {
      //     duration: 4500,
      //     alertType: 'successful',
      //     actions: [
      //       { href: 'https://sg.hu', text: 'SG' },
      //       { href: 'https://index.hu', text: 'Index' },
      //     ],
      //   })
      // }
    },
    onTitleChange(e: FormEvent) {
      console.log('onTitleChange')
      if (e?.detail?.value) {
        this.formData.title = e.detail.value
        console.log(e.detail.value)
      }
    },
    onCheckboxChanged(e: ConsentEvent) {
      console.log('onCheckboxChanged')
      if (e?.detail?.checked) {
        console.log(e.detail.checked)
        this.formData.consent = true
      } else {
        this.formData.consent = false
      }
    },
    onBirthDayChanged(e: FormEvent) {
      console.log('onBirthDayChanged')
      if (e?.detail?.value) {
        this.formData.birthDate = e.detail.value
        console.log(e.detail.value)
      }
    },
    onProductSearchInput(e: ProductSearchEvent) {
      console.log('onProductSearchInput')
      const productFilter = e?.detail?.input
      if (productFilter) {
        clearTimeout(this.timeOutId)
        this.timeOutId = setTimeout(() => {
          this.getProducts(productFilter).then(
            (products: Product[]) => (this.products = products ? products : []),
          )
        }, 300)
      }
    },
    onProductSelected(e: ProductSelectedEvent) {
      console.log('onProductSelected')
      const selectedProduct = e?.detail?.value
      this.formData.product = selectedProduct ? selectedProduct : ''
    },
    validateRequired(formField: FormKeys, errorMessage: string): string {
      if (this.submitted && errorMessage && !this.formData[formField]) {
        return errorMessage
      }
      return ''
    },
    validateFullName() {
      return this.validateRequired('fullName', 'Add meg a teljes neved!')
    },
    validateTitle() {
      return this.validateRequired('title', 'Válassz megnevezést!')
    },
    validateEmail() {
      if (this.submitted && this.formData.email.length <= 0) {
        return 'Add meg az e-mail címed!'
      }
      if (this.submitted && this.formData.email.length > 0) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailPattern.test(this.formData.email)) {
          return 'Az e-mail cím formátuma helytelen!'
        }
      }
      return ''
    },
    validateBirthDate() {
      return this.validateRequired('birthDate', 'Add meg a születési dátumod!')
    },
    validateProduct() {
      return this.validateRequired('product', 'Válassz egy terméket!')
    },
    validateMessage() {
      return this.validateRequired('message', 'Írd be az üzeneted!')
    },
    validateConsent() {
      if (this.submitted && !this.formData.consent) {
        return 'Fogadd el az Adatkezelési tájékoztatót!'
      }
      return ''
    },
  },
}
</script>

<style scoped></style>
