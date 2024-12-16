import { createStore } from 'solid-js/store';
import './App.css'
import DapDSButtonSolid from './components/button'
import DapDSInputSolid from './components/input'
import DapDSOptionItemSolid from './components/option';
import DapDSSelectSolid from './components/select';
import DapDSStackSolid from './components/stack'
import DapDSDatePickerSolid from './components/datepicker';
import DapDSTextareaSolid from './components/textarea';

function App() {
  const [form, setForm] = createStore({
    name: "",
    prefix: "",
    email: "",
    birthDate: "",
    subject: "",
    message: "",
  });

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
              feedback="fix hiba üzenet"
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
