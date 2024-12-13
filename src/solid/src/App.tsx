import './App.css'
import DapDSButtonSolid from './components/button'
import DapDSInputSolid from './components/input'
import DapDSOptionItemSolid from './components/option';
import DapDSSelectSolid from './components/select';
import DapDSStackSolid from './components/stack'
import { useForm } from "./useForm";

function App() {
  const { form, updateFormField, submit } = useForm();

  const handleSubmit = (event: Event): void => {
    debugger
    event.preventDefault();
    submit(form);
  };

  return (
    <>
      <div>
        <h1>Solid</h1>
        <form onSubmit={handleSubmit}>
          <DapDSStackSolid>
            <DapDSInputSolid
              id="name"
              label="Teljes név"
              name="name"
              feedbackType="negative"
              feedback="fix hiba üzenet"
              value={form.name}
              onDdsChange={() => updateFormField("name")}
            >
            </DapDSInputSolid>
            <DapDSSelectSolid
                id="prefix"
                label="Megnevezés"
                name="prefix"
                value={form.prefix}
                onDdsChange={() => updateFormField("prefix")}
                >
                  <DapDSOptionItemSolid value="mr">Úr</DapDSOptionItemSolid>
                  <DapDSOptionItemSolid value="mrs">Hölgy</DapDSOptionItemSolid>
                  <DapDSOptionItemSolid value="miss">Kisasszony</DapDSOptionItemSolid>
              </DapDSSelectSolid>
            <DapDSButtonSolid onClick={(e: Event) => handleSubmit(e)} htmlType="submit">Küldés</DapDSButtonSolid>
          </DapDSStackSolid>
        </form>
      </div>
    </>
  )
}

export default App
