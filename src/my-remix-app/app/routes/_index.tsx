import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Suspense, lazy, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Form, useActionData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ClientOnly } from "remix-utils/client-only";
import dayjs from 'dayjs';
import { useQuery } from "@tanstack/react-query";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const DapDSInput = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSInputReact })))
const DapDSButton = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSButtonReact })))
const DapDSSnackbar = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSSnackbarReact })))
const DapDSSelectReact = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSSelectReact })))
const DapDSOptionItemReact = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSOptionItemReact })))
const DapDSDatePicker = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSDatePickerReact })))
const DapDSComboboxReact = lazy(async () => await import('dap-design-system/dist/react').then(module => ({ default: module.DapDSComboboxReact })))

const schema = zod.object({
  name: zod.string().min(1, { message: "Add meg a neved!" }),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

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
    setError,
    formState: { errors },
  } = useRemixForm({
    defaultValues: {
      name: '',
      prefix: '',
      email: '',
      datepicker: '',
      product: '',
      message: '',
      consent: false,
    },
  })

  const [filter, setFilter] = useState('')

  const query = useQuery({
    queryKey: ['products', filter],
    queryFn: () => getProducts(filter),
  })

  const getProducts = async(filter: string) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${filter}`)
    const json = await response.json()


    return json.products.filter((item: { title: string; }) => item.title.toLowerCase().startsWith(filter.toLowerCase()))
  }

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
              <Controller
                name="prefix"
                control={control}
                render={({ field: { value } }) => (
                  <DapDSSelectReact
                    id="prefix"
                    label="Megnevezés"
                    name="prefix"
                    value={value}
                    feedback={errors?.prefix?.message?.toString()}
                    feedbackType="negative"
                    onDdsChange={e => {
                      setValue('prefix', e.detail.value)
                    }}>
                      <DapDSOptionItemReact value="mr">Úr</DapDSOptionItemReact>
                      <DapDSOptionItemReact value="mrs">Hölgy</DapDSOptionItemReact>
                      <DapDSOptionItemReact value="miss">Kisasszony</DapDSOptionItemReact>
                  </DapDSSelectReact>
                )}
                rules={{
                  validate: {
                    required: value => {
                      if (!value) return 'Válassz megnevezést!'
                    },
                  },
                }}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { value } }) => (
                  <DapDSInput
                    id="email"
                    label="E-mail cím"
                    name="email"
                    value={value}
                    type="email"
                    feedback={errors?.email?.message?.toString()}
                    feedbackType="negative"
                    onDdsChange={e => {
                      setValue('email', e.detail.value, { shouldValidate: true })
                    }}></DapDSInput>
                )}
                rules={{
                  validate: {
                    required: value => {
                      if (!value) return 'Add meg az e-mail címed!'
                    },
                    pattern: value => {
                      if (!value.match(/[^@\s]+@[^@\s]+\.[^@\s]+/))
                        return 'Az e-mail cím formátuma helytelen!'
                    },
                  },
                }}
              />
              <Controller
                name="datepicker"
                control={control}
                render={({ field: { value } }) => (
                  <DapDSDatePicker
                    id="datepicker"
                    label="Születési dátum"
                    description="Add meg a születési dátumod!"
                    name="datepicker"
                    value={value}
                    feedback={errors?.datepicker?.message?.toString()}
                    feedbackType={errors?.datepicker ? 'negative' : 'positive'}
                    onDdsChange={(e) => {
                      console.log(e)
                      setValue('datepicker', e.detail.value, { shouldValidate: true })}
                    }
                    onDdsInvalidDate={(e) => {
                      console.log(e)
                      if (e.detail.type === 'invalid') {
                        setError('datepicker', { message: `Érvénytelen dátum: ${dayjs.Ls[dayjs.locale()].formats.L}` })
                      }

                      if (e.detail.type === 'out-of-range') {
                        setError('datepicker', { message: 'Nem választható dátum!' })
                      }
                    }}
                    onDdsValidDate={(e: unknown) => {
                      console.log(e)
                      setError('datepicker', { message: '' })
                    }}
                  >
                  </DapDSDatePicker>
                )}
                rules={{
                  validate: {
                    required: value => {
                      if (!value) return 'Add meg a születési dátumod!'
                    },
                  },
                }}
              />
              <Controller
                name="product"
                control={control}
                render={({ field: { value } }) => (
                  <DapDSComboboxReact
                    id="product"
                    label="Kedvenc terméked"
                    name="product"
                    value={value}
                    feedback={errors?.product?.message?.toString()}
                    feedbackType="negative"
                    onDdsChange={e => {
                      setValue('product', e.detail?.value)
                    }}
                    onDdsInput={e => {
                      setFilter(e.detail?.input)
                    }}
                    sync
                    placeholder="Válassz egy terméket">
                    {query.data?.map((item: Product) => (
                      <DapDSOptionItemReact key={item.id} value={item.id} label={item.title}>
                        {item.title}
                      </DapDSOptionItemReact>
                    ))}
                  </DapDSComboboxReact>
                )}
                rules={{
                  validate: {
                    required: value => {
                      if (!value) return 'Válassz egy terméket!'
                    },
                  },
                }}
              />
            <DapDSButton htmlType="submit">Submit</DapDSButton>
          </Form>
        </>
      }
      </ClientOnly>
    </Suspense>
  );
}
