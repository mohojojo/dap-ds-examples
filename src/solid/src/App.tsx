import { createStore } from 'solid-js/store';
import './App.css'
import DapDSButtonSolid from './components/button'
import DapDSInputSolid from './components/input'
import DapDSOptionItemSolid from './components/option';
import DapDSSelectSolid from './components/select';
import DapDSStackSolid from './components/stack'
import DapDSDatePickerSolid from './components/datepicker';
import DapDSTextareaSolid from './components/textarea';
import DapDSCheckboxSolid from './components/checkbox';
import DapDSComboboxSolid from './components/combobox';
import { createSignal, For } from 'solid-js';
import DapDSSnackbarSolid from './components/snackbar';

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
        <DapDSSnackbarSolid></DapDSSnackbarSolid>
        <h1>Solid</h1>
        <form>
          <DapDSStackSolid>
            <DapDSInputSolid
              id="name"
              label="Teljes név"
              name="name"
              feedbackType="negative"
              value={form.name}
              feedback={errors?.name?.toString()}
              onDdsChange={(nameValue: string) => {
                setForm({name: nameValue});
                validateRequired('name', 'Add meg a teljes neved!');
              }}
            >
            </DapDSInputSolid>
            <DapDSSelectSolid
              id="prefix"
              label="Megnevezés"
              name="prefix"
              value={form.prefix}
              onDdsChange={(selectValue: string) => setForm({prefix: selectValue})}
              >
                <DapDSOptionItemSolid value="mr">Úr</DapDSOptionItemSolid>
                <DapDSOptionItemSolid value="mrs">Hölgy</DapDSOptionItemSolid>
                <DapDSOptionItemSolid value="miss">Kisasszony</DapDSOptionItemSolid>
            </DapDSSelectSolid>
            <DapDSInputSolid
              id="email"
              label="E-mail cím"
              name="email"
              value={form.email}
              feedbackType="negative"
              feedback={errors?.email?.toString()}
              onDdsChange={(emailValue: string) => {
                setForm({email: emailValue});
                validateEmailPattern('email', 'Az e-mail cím formátuma helytelen vagy üres!');
              }}
            ></DapDSInputSolid>
            <DapDSDatePickerSolid
              id="birthDate"
              label="Születési dátum"
              name="datepicker"
              value={form.birthDate}
              feedbackType="negative"
              feedback={errors?.birthDate?.toString()}
              onDdsChange={(birthDateValue: string) => {
                setForm({birthDate: birthDateValue});
                validateRequired('birthDate', 'Add meg a születési dátumod!');
              }}
              >
            </DapDSDatePickerSolid>
            <DapDSComboboxSolid
              id="product"
              label="Kedvenc terméked"
              name="product"
              value={form.product}
              feedbackType="negative"
              onDdsChange={(productValue: string) => setForm({product: productValue})}
              onDdsInput={
                (productFilter: string) => {
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
                    <DapDSOptionItemSolid key={item.id} value={item.id as unknown as string} label={item.title}>
                    {item.title}
                  </DapDSOptionItemSolid>
                  )}
                </For>
            </DapDSComboboxSolid>
            <DapDSInputSolid
              id="subject"
              label="Tárgy"
              name="subject"
              value={form.subject}
              feedbackType="negative"
              onDdsChange={(subjectValue: string) => setForm({subject: subjectValue})}
            ></DapDSInputSolid>
            <DapDSTextareaSolid
              id="message"
              label="Üzenet"
              name="message"
              value={form.message}
              feedbackType="negative"
              feedback={errors?.message?.toString()}
              onDdsChange={(messageValue: string) => {
                setForm({message: messageValue});
                validateRequired('message', 'Írd be az üzeneted!');
              }}
            ></DapDSTextareaSolid>
            <DapDSCheckboxSolid
              id="consent"
              label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
              name="consent"
              feedbackType="negative"
              checked={form.consent}
              feedback={errors?.consent?.toString()}
              onDdsChange={(consentValue: boolean) => {
                setForm({consent: consentValue});
                validateRequired('consent', 'Fogadd el az Adatkezelési tájékoztatót!');
            }}
            ></DapDSCheckboxSolid>
            <DapDSButtonSolid onClick={(e: Event) => onSubmit(e)} htmlType="submit">Küldés</DapDSButtonSolid>
          </DapDSStackSolid>
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
