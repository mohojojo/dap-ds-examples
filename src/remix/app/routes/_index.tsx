import type { MetaFunction } from "@remix-run/node";
import { DapDSButtonReact, DapDSCheckboxReact, DapDSComboboxReact, DapDSDatePickerReact, DapDSInputReact, DapDSOptionItemReact, DapDSSelectReact, DapDSStackReact, DapDSTextareaReact } from 'dap-design-system/dist/react'
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

const schema = zod.object({
  name: zod.string().min(1),
  prefix: zod.string().min(1),
  email: zod.string().email().min(1),
  datepicker: zod.string().min(1),
  product: zod.string().min(1),
  subject: zod.string(),
  message: zod.string().min(1),
  consent: zod.boolean(),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export const meta: MetaFunction = () => {
  return [
    { title: "Remix DÁP DS példa" },
    { name: "description", content: "Üdv a Remix példánál!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return Response.json({ errors, defaultValues });
  }

  // Do something with the data
  return Response.json(data);
};


export default function Index() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center gap-16">
        This is my Remix.js form!
      </div>
    </div>
  );
}
