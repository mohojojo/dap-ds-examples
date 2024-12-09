<template>
  <main>
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
      },
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
    },
    onTitleChange(e: FormEvent) {
      console.log('onTitleChange');
      if (e?.detail?.value) {
        console.log(e.detail.value);
      }
    },
    onProductSearchInput(e: ProductSearchEvent) {
      console.log('onTitleChange');
      const productFilter = e?.detail?.input;
      if (productFilter) {
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          this.getProducts(productFilter)
            .then((products: Product[]) => this.products = products ? products : [])
        }, 300);
      }
    },
    validateFullName() {
      if (this.submitted && this.formData.fullName.length <= 0) {
        return 'Add meg a teljes neved!';
      }
      return '';
    },
    validateTitle() {
      if (this.submitted && this.formData.title.length <= 0) {
        return 'Válassz megnevezést!';
      }
      return '';
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
      if (this.submitted && this.formData.birthDate.length <= 0) {
        return 'Add meg a születési dátumod!';
      }
      return '';
    },
    validateProduct() {
      if (this.submitted && this.formData.product.length <= 0) {
        return 'Válassz egy terméket!';
      }
      return '';
    },
    validateMessage() {
      if (this.submitted && this.formData.message.length <= 0) {
        return 'Írd be az üzeneted!';
      }
      return '';
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
