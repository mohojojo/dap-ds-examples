import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Suspense, lazy, useEffect } from "react";
import { Controller } from "react-hook-form";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Form, useActionData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ClientOnly } from "remix-utils/client-only";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const DapDSInput = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSInputReact })))
const DapDSButton = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSButtonReact })))
const DapDSSnackbar = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSSnackbarReact })))

const schema = zod.object({
  name: zod.string().min(1, { message: "Add meg a neved!" }),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    console.log(errors);
    return Response.json({ errors, defaultValues });
  }

  // Do something with the data
  console.log(data);
  return Response.json({ data });
};

export default function Index() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useRemixForm({
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
      consent: false,
    },
  })

  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if(actionData && !actionData.errors) {
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
  },[actionData])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientOnly>
        {() =>
          <>
            <DapDSSnackbar></DapDSSnackbar>
            <Form noValidate onSubmit={handleSubmit} method="POST" navigate={false} fetcherKey="my-key">
              <Controller
                name="name"
                control={control}
                render={({ field: { value } }) => (
                  <DapDSInput
                    id="name"
                    label="Teljes név"
                    required
                    name="name"
                    value={value}
                    feedback={errors?.name?.message?.toString()}
                    feedbackType="negative"
                    onDdsChange={e => {
                      setValue('name', e.detail.value, { shouldValidate: true })
                    }}></DapDSInput>
                )}
              />
            <DapDSButton htmlType="submit">Submit</DapDSButton>
          </Form>
        </>
      }
      </ClientOnly>
    </Suspense>
  );
}
