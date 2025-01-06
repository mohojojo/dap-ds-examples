import { createStore } from 'solid-js/store';
import './App.css'
import { createSignal, For } from 'solid-js';

declare global {
  interface Window {
    showDapSnackbar?: (message: string, options?: any) => void
  }
}

interface FormFields {
  name: string;
  prefix: string;
  email: string;
  birthDate: string;
  product: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

interface InputDetail {
  value: string;
}

interface NestedInputDetail {
  input: string;
}

interface CheckedDetail {
  checked: boolean;
}

type InputEvent = CustomEvent<InputDetail>;
type NestedInputEvent = CustomEvent<NestedInputDetail>;
type CheckedInputEvent = CustomEvent<CheckedDetail>;

function App() {
  let timeOutId = 0;
  const [products, setProducts] = createSignal<Product[]>([]);
  const [form, setForm] = createStore<FormFields>({
    name: "",
    prefix: "",
    email: "",
    birthDate: "",
    product: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = createStore({
    name: "",
    prefix: "",
    email: "",
    birthDate: "",
    product: "",
    subject: "",
    message: "",
    consent: "",
  });

  const getProducts = async(filter: string) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`);
    const json = await response.json();
    return json.products.filter((item: any) => item.title.toLowerCase().startsWith(filter.toLowerCase()));
  }

  const onSubmit = (e: Event) => {
    e.preventDefault();
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
  }

  const getFormFieldValue = (field: keyof FormFields): string | boolean=> form[field];
  const updateErrorField = (field: keyof FormFields, value: string) => setErrors({ [field]: value });

  const validateRequired = (field: keyof FormFields, message: string): void => {
    if (!getFormFieldValue(field)) {
      updateErrorField(field, message)
    } else {
      updateErrorField(field, '')
    }
  }

  const validateEmailPattern = (field: keyof FormFields, message: string): void => {
    const fieldValue = getFormFieldValue(field);
    if (typeof fieldValue === 'string' && !fieldValue.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)) {
      updateErrorField(field, message);
    } else {
      updateErrorField(field, '');
    }
  }

  return (
    <>
      <div>
        <dap-ds-snackbar></dap-ds-snackbar>
        <form onSubmit={onSubmit}>
          <dap-ds-stack>
            <dap-ds-input
              id="name"
              label="Teljes név"
              name="name"
              feedbackType="negative"
              value={form.name}
              feedback={errors?.name?.toString()}
              on:dds-change={(e: InputEvent) => {
                const nameValue = e.detail.value;
                setForm({name: nameValue});
                validateRequired('name', 'Add meg a teljes neved!');
              }}
            >
            </dap-ds-input>
            <dap-ds-select
              id="prefix"
              label="Megnevezés"
              name="prefix"
              on:dds-change={
                (e: InputEvent) => {
                  const selectValue = e.detail.value;
                  setForm({prefix: selectValue});
                }
              }
              >
                <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
                <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
                <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
            </dap-ds-select>
            <dap-ds-input
              id="email"
              label="E-mail cím"
              name="email"
              value={form.email}
              feedbackType="negative"
              feedback={errors?.email?.toString()}
              on:dds-change={(e: InputEvent) => {
                const emailValue = e.detail.value;
                setForm({email: emailValue});
                validateEmailPattern('email', 'Az e-mail cím formátuma helytelen vagy üres!');
              }}
            ></dap-ds-input>
            <dap-ds-datepicker
              id="birthDate"
              label="Születési dátum"
              name="datepicker"
              value={form.birthDate}
              feedbackType="negative"
              feedback={errors?.birthDate?.toString()}
              on:dds-change={(e: InputEvent) => {
                const birthDateValue = e.detail.value;
                setForm({birthDate: birthDateValue});
                validateRequired('birthDate', 'Add meg a születési dátumod!');
              }}
              >
            </dap-ds-datepicker>
            <dap-ds-combobox
              id="product"
              label="Kedvenc terméked"
              name="product"
              value={form.product}
              feedbackType="negative"
              on:dds-change={(e: InputEvent) => {
                const productValue = e.detail.value;
                setForm({product: productValue})
              }}
              on:dds-input={
                (e: NestedInputEvent) => {
                  const productFilter = e.detail.input;
                  if (productFilter) {
                    clearTimeout(timeOutId);
                    timeOutId = setTimeout(() => {
                      getProducts(productFilter)
                        .then((products: Product[]) => {
                          if (products) {
                            setProducts([...products])
                          }
                        })
                    }, 300);
                  }
              }}
              sync
              placeholder="Válassz egy terméket">
                <For each={products()}>
                  {(item, _index) => (
                    <dap-ds-option-item key={item.id} value={item.id as unknown as string} label={item.title}>
                    {item.title}
                  </dap-ds-option-item>
                  )}
                </For>
            </dap-ds-combobox>
            <dap-ds-input
              id="subject"
              label="Tárgy"
              name="subject"
              value={form.subject}
              feedbackType="negative"
              on:dds-change={(e: InputEvent) => {
                const subjectValue = e.detail.value;
                setForm({subject: subjectValue})
              }}
            ></dap-ds-input>
            <dap-ds-textarea
              id="message"
              label="Üzenet"
              name="message"
              value={form.message}
              feedbackType="negative"
              feedback={errors?.message?.toString()}
              on:dds-change={(e: InputEvent) => {
                const messageValue = e.detail.value;
                setForm({message: messageValue});
                validateRequired('message', 'Írd be az üzeneted!');
              }}
            ></dap-ds-textarea>
            <dap-ds-checkbox
              id="consent"
              label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
              name="consent"
              feedbackType="negative"
              checked={form.consent}
              feedback={errors?.consent?.toString()}
              on:dds-change={(e: CheckedInputEvent) => {
                const consentValue = e.detail.checked;
                setForm({consent: consentValue});
                validateRequired('consent', 'Fogadd el az Adatkezelési tájékoztatót!');
            }}
            ></dap-ds-checkbox>
            <dap-ds-button onClick={(e: Event) => onSubmit(e)} htmlType="submit">Küldés</dap-ds-button>
          </dap-ds-stack>
          <div>
              <h3>Form Data:</h3>
              <pre>{JSON.stringify(form, null, 2)}</pre>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
