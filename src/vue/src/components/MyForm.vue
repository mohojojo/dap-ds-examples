<template>
  <main>
    <dap-ds-snackbar></dap-ds-snackbar>
    <form @submit.prevent="handleSubmit">
      <dap-ds-stack>
        <dap-ds-input
          v-model="formData.fullName"
          feedbackType="negative"
          required
          :feedback="validateFullName()"
          label="Teljes név"
        ></dap-ds-input>
        <dap-ds-select
          label="Megnevezés"
          v-model="formData.title"
          required
          :feedback="validateTitle()"
          @dds-change="onTitleChange"
          feedbackType="negative"
        >
          <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
          <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
          <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
        </dap-ds-select>
        <dap-ds-input
          v-model="formData.email"
          placeholder="Email"
          :feedback="validateEmail()"
          required
          label="E-mail cím"
          feedbackType="negative"
        ></dap-ds-input>
        <dap-ds-datepicker
            :feedback="validateBirthDate()"
            @dds-change="onBirthDayChanged"
            v-model="formData.birthDate"
            feedbackType="negative"
            required
            label="Születési dátum"
            description="Add meg a születési dátumod!"
        ></dap-ds-datepicker>

        <dap-ds-combobox
          v-model="formData.product"
          :feedback="validateProduct()"
          @dds-input="onProductSearchInput"
          @dds-change="onProductSelected"
          label="Termék megnevezés"
          required
          sync
          feedbackType="negative"
          placeholder="Válassz egy terméket"
        >
          <dap-ds-option-item
            v-for="product in products"
            :key="product.id"
            :value="product.id"
            :label="product.title"
          >{{ product.title }}</dap-ds-option-item>
        </dap-ds-combobox>
        <dap-ds-input
          v-model="formData.subject"
          label="Tárgy"
          optional
          optionalLabel="(Nem kötelező)"
        ></dap-ds-input>
        <dap-ds-textarea
          v-model="formData.message"
          :feedback="validateMessage()"
          required
          feedbackType="negative"
          label="Üzenet"
        ></dap-ds-textarea>
        <dap-ds-checkbox
          v-model="formData.consent"
          :feedback="validateConsent()"
          @dds-input="onCheckboxChanged"
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
type FormEvent = { detail: { value: string; }; } | undefined;
type ProductSearchEvent = { detail: { input: string; }; } | undefined;
type ProductSelectedEvent = { detail: { text: string; }; } | undefined;
type ConsentEvent = { detail: { checked: boolean; }; } | undefined;

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

type SearchResult = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type FormData = {
  fullName: string;
  title: string;
  email: string;
  birthDate: string;
  product: string;
  subject: string;
  message: string;
  consent: boolean;
};

type FormKeys = keyof FormData;

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
    getProducts: async(filter: string) => {
      const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`)
      const json = await response.json()
      return json.products.filter((item: { title: string; }) => item.title.toLowerCase().startsWith(filter.toLowerCase()))
    },
    handleSubmit() {
      this.submitted = true;
      console.log('Form Data:', this.formData);
      if (window.showDapSnackbar) {
        window.showDapSnackbar('Gratulálunk! Minden mező helyes!', {
          duration: 4500,
          alertType: 'successful',
          actions: [
            { href: 'https://sg.hu', text: 'SG' },
            { href: 'https://index.hu', text: 'Index' },
          ],
        })
      }
    },
    onTitleChange(e: FormEvent) {
      console.log('onTitleChange');
      if (e?.detail?.value) {
        this.formData.title = e.detail.value;
        console.log(e.detail.value);
      }
    },
    onCheckboxChanged(e: ConsentEvent) {
      console.log('onCheckboxChanged');
      if (e?.detail?.checked) {
        console.log(e.detail.checked);
        this.formData.consent = true;
      } else {
        this.formData.consent = false;
      }
    },
    onBirthDayChanged(e: FormEvent) {
      console.log('onBirthDayChanged');
      if (e?.detail?.value) {
        this.formData.birthDate = e.detail.value;
        console.log(e.detail.value);
      }
    },
    onProductSearchInput(e: ProductSearchEvent) {
      console.log('onProductSearchInput');
      const productFilter = e?.detail?.input;
      if (productFilter) {
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          this.getProducts(productFilter)
            .then((products: Product[]) => this.products = products ? products : [])
        }, 300);
      }
    },
    onProductSelected(e: ProductSelectedEvent) {
      console.log('onProductSelected');
      const selectedProduct = e?.detail?.text;
      this.formData.product = selectedProduct ? selectedProduct : '';
    },
    validateRequired(formField: FormKeys, errorMessage: string): string {
      if (this.submitted && errorMessage && !this.formData[formField]) {
        return errorMessage;
      }
      return '';
    },
    validateFullName() {
      return this.validateRequired('fullName', 'Add meg a teljes neved!');
    },
    validateTitle() {
      return this.validateRequired('title', 'Válassz megnevezést!');
    },
    validateEmail() {
      if (this.submitted && this.formData.email.length <= 0) {
        return 'Add meg az e-mail címed!';
      }
      if (this.submitted && this.formData.email.length > 0) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.formData.email)) {
          return 'Az e-mail cím formátuma helytelen!';
        }
      }
      return '';
    },
    validateBirthDate() {
      return this.validateRequired('birthDate', 'Add meg a születési dátumod!');
    },
    validateProduct() {
      return this.validateRequired('product', 'Válassz egy terméket!');
    },
    validateMessage() {
      return this.validateRequired('message', 'Írd be az üzeneted!');
    },
    validateConsent() {
      if (this.submitted && !this.formData.consent) {
        return 'Fogadd el az Adatkezelési tájékoztatót!';
      }
      return '';
    },
  },
}
</script>

<style scoped></style>
