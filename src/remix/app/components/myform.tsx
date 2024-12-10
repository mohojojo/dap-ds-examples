import { DapDSButtonReact, DapDSInputReact, DapDSStackReact } from 'dap-design-system/dist/react';
import { useRemixForm, RemixFormProvider } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ClientOnly } from "remix-utils/client-only";

const schema = zod.object({
    name: zod.string().min(1),
});

export default function FormComponent() {
  return (
    <ClientOnly fallback={<MyFallback />}>
      {() => <MyForm />}
    </ClientOnly>
  );
}

export function MyFallback() {
  return (
    <div>Fallback</div>
  );
}

export function MyForm() {
    const methods = useRemixForm({
        resolver: zodResolver(schema),
        submitHandlers: {
            onValid: (data) => console.log("Valid data", data),
            onInvalid: (errors) => console.error("Validation errors", errors),
        },
    });

    return (
        <RemixFormProvider {...methods}>
          <h1>Remix Form</h1>
          <form onSubmit={methods.handleSubmit}>
              <DapDSStackReact>
                <DapDSInputReact
                  id="name"
                  label="Teljes név"
                  name="name"
                  feedbackType="negative"></DapDSInputReact>
                <DapDSButtonReact htmlType="submit">Küldés</DapDSButtonReact>
              </DapDSStackReact> 
          </form>
        </RemixFormProvider>
    );
}