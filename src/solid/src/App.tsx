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
  const [form, setForm] = createStore({
    name: "",
    prefix: "",
    email: "",
    birthDate: "",
    product: "",
    subject: "",
    message: "",
    consent: false,
  });

  const getProducts = async(filter: string) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`);
    const json = await response.json();
    return json.products.filter((item: any) => item.title.toLowerCase().startsWith(filter.toLowerCase()));
  }

  return (
    <>
      <div>
        <h1>Solid</h1>
        <form>
          <DapDSStackSolid>
            <DapDSInputSolid
              id="name"
              label="Teljes név"
              name="name"
              feedbackType="negative"
              value={form.name}
              onDdsChange={(nameValue: string) => setForm({name: nameValue})}
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
              onDdsChange={(emailValue: string) => setForm({email: emailValue})}
            ></DapDSInputSolid>
            <DapDSDatePickerSolid
              id="birthDate"
              label="Születési dátum"
              name="datepicker"
              value={form.birthDate}
              feedbackType="negative"
              onDdsChange={(birthDateValue: string) => setForm({birthDate: birthDateValue})}
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
              onDdsChange={(messageValue: string) => setForm({message: messageValue})}
            ></DapDSTextareaSolid>
            <DapDSCheckboxSolid
              id="consent"
              label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
              name="consent"
              checked={form.consent}
              feedbackType="negative"
              onDdsChange={(consentValue: boolean) => setForm({consent: consentValue})}
            ></DapDSCheckboxSolid>
            <DapDSButtonSolid htmlType="submit">Küldés</DapDSButtonSolid>
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
