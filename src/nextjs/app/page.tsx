"use client"

import { Controller, useForm } from "react-hook-form"
import "./globals.css"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  DdsChangeEvent,
  DdsInputEvent,
  DdsInvalidDateEvent,
} from "dap-design-system"
import dayjs from "dayjs"

export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
}

export type FormData = {
  name: string
  prefix: string
  email: string
  datepicker: string
  product: string
  subject?: string
  message: string
  consent: boolean
}

export default function Home() {
  let timeOutId: NodeJS.Timeout | number = 0

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>()

  const [filter, setFilter] = useState("")

  const query = useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(filter),
  })

  const getProducts = async (filter: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${filter}`
    )
    const json = await response.json()

    return json.products.filter((item: Product) =>
      item.title.toLowerCase().startsWith(filter.toLowerCase())
    )
  }

  const onSubmit = (data: FormData) => {
    console.log("data", data)
    if (window.showDapSnackbar) {
      window.showDapSnackbar("Gratulálunk! Minden mező helyes!", {
        duration: 4500,
        alertType: "successful",
        actions: [
          { href: "https://sg.hu", text: "SG" },
          { href: "https://index.hu", text: "Index" },
        ],
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <dap-ds-stack>
          <Controller
            name="name"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="name"
                label="Teljes név"
                name="name"
                value={value}
                feedback={errors?.name?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("name", e.detail.value, { shouldValidate: true })
                }}
                ondds-input={(e: DdsInputEvent) => {
                  console.log(e.detail.input)
                }}
              ></dap-ds-input>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg a teljes neved!"
                },
              },
            }}
          />
          <dap-ds-number-input
            id="number"
            label="Number"
            name="name"
            ondds-change={(e: DdsChangeEvent) => {
              console.log(e.detail.value)
            }}
            ondds-input={(e: DdsInputEvent) => {
              console.log(e.detail.value)
            }}
          ></dap-ds-number-input>
          <Controller
            name="prefix"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-select
                id="prefix"
                label="Megnevezés"
                name="prefix"
                value={value}
                autocomplete="off"
                feedback={errors?.prefix?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("prefix", e.detail.value)
                }}
              >
                <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
                <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
                <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
              </dap-ds-select>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Válassz megnevezést!"
                },
              },
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="email"
                label="E-mail cím"
                name="email"
                value={value}
                type="email"
                feedback={errors?.email?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("email", e.detail.value, { shouldValidate: true })
                }}
              ></dap-ds-input>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg az e-mail címed!"
                },
                pattern: (value) => {
                  if (!value.match(/[^@\s]+@[^@\s]+\.[^@\s]+/))
                    return "Az e-mail cím formátuma helytelen!"
                },
              },
            }}
          />
          <Controller
            name="datepicker"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-datepicker
                id="datepicker"
                label="Születési dátum"
                description="Add meg a születési dátumod!"
                name="datepicker"
                value={value}
                feedback={errors?.datepicker?.message?.toString()}
                feedbackType={errors?.datepicker ? "negative" : "positive"}
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("datepicker", e.detail.value, {
                    shouldValidate: true,
                  })
                }}
                ondds-invaliddate={(e: DdsInvalidDateEvent) => {
                  if (e.detail.type === "invalid") {
                    setError("datepicker", {
                      message: `Érvénytelen dátum: ${
                        dayjs.Ls[dayjs.locale()].formats.L
                      }`,
                    })
                  }

                  if (e.detail.type === "out-of-range") {
                    setError("datepicker", {
                      message: "Nem választható dátum!",
                    })
                  }
                }}
                ondds-validdate={() => {
                  setError("datepicker", { message: "" })
                }}
              ></dap-ds-datepicker>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Add meg a születési dátumod!"
                },
              },
            }}
          />
          <Controller
            name="product"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-combobox
                id="product"
                label="Kedvenc terméked"
                name="product"
                value={value}
                autocomplete="off"
                feedback={errors?.product?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("product", e.detail?.value)
                }}
                ondds-input={(e: DdsInputEvent) => {
                  const productFilter = e?.detail?.input
                  if (productFilter) {
                    clearTimeout(timeOutId)
                    timeOutId = setTimeout(() => {
                      setFilter(productFilter)
                    }, 300)
                  }
                }}
                sync
                placeholder="Válassz egy terméket"
              >
                {query.data?.map((item: Product) => (
                  <dap-ds-option-item
                    key={item.id}
                    value={item.id}
                    label={item.title}
                  >
                    {item.title}
                  </dap-ds-option-item>
                ))}
              </dap-ds-combobox>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Válassz egy terméket!"
                },
              },
            }}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-input
                id="subject"
                label="Tárgy"
                optional
                optionalLabel="(Nem kötelező)"
                name="subject"
                value={value}
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("subject", e.detail.value)
                }}
              ></dap-ds-input>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-textarea
                id="message"
                label="Üzenet"
                name="message"
                value={value}
                feedback={errors?.message?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("message", e.detail.value, { shouldValidate: true })
                }}
              ></dap-ds-textarea>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Írd be az üzeneted!"
                },
              },
            }}
          />
          <Controller
            name="consent"
            control={control}
            render={({ field: { value } }) => (
              <dap-ds-checkbox
                id="consent"
                label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
                name="consent"
                checked={value}
                feedback={errors?.consent?.message?.toString()}
                feedbackType="negative"
                ondds-change={(e: DdsChangeEvent) => {
                  setValue("consent", e.detail.checked, {
                    shouldValidate: true,
                  })
                }}
              ></dap-ds-checkbox>
            )}
            rules={{
              validate: {
                required: (value) => {
                  if (!value) return "Fogadd el az Adatkezelési tájékoztatót!"
                },
              },
            }}
          />
          <dap-ds-button htmlType="submit">Küldés</dap-ds-button>
        </dap-ds-stack>
      </form>
    </div>
  )
}
