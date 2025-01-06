import { DapDSCheckboxReact, DapDSTextareaReact, DapDSComboboxReact, DapDSDatePickerReact, DapDSOptionItemReact, DapDSSelectReact, DapDSButtonReact, DapDSInputReact, DapDSStackReact} from 'dap-design-system/dist/react'
import { Controller, useForm } from 'react-hook-form';
import './app.css'
import dayjs from 'dayjs'
import { useState } from 'preact/hooks';
import { useQuery } from 'react-query';
import useDebounce from './use-debounce';

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

function useProducts(filter: string) {
  let url = `https://dummyjson.com/products/search?q=${filter}`;
  return useQuery(
    ["products", { filter }],
    () => fetch(url).then((res) => res.json()),
    {
      enabled: !!filter, // Run when 'filter' is not empty
    }
  );
}

export function App() {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm()

  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounce(filter, 350);
  const { data } = useProducts(debouncedFilter as string);

  const onSubmit = (data: any) => {
    console.log('data', data)
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

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DapDSStackReact>
            <Controller
              name="name"
              control={control}
              render={({ field: { value } }) => (
                <DapDSInputReact
                  id="name"
                  label="Teljes név"
                  name="name"
                  value={value}
                  feedback={errors?.name?.message?.toString()}
                  feedbackType="negative"
                  onDdsChange={e => {
                    setValue('name', e.detail.value, { shouldValidate: true })
                  }}></DapDSInputReact>
              )}
              rules={{
                validate: {
                  required: value => {
                    if (!value) return 'Add meg a teljes neved!'
                  },
                },
              }}
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
                <DapDSInputReact
                  id="email"
                  label="E-mail cím"
                  name="email"
                  value={value}
                  type="email"
                  feedback={errors?.email?.message?.toString()}
                  feedbackType="negative"
                  onDdsChange={e => {
                    setValue('email', e.detail.value, { shouldValidate: true })
                  }}></DapDSInputReact>
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
                <DapDSDatePickerReact
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
                  onDdsValidDate={(e) => {
                    console.log(e)
                    setError('datepicker', { message: '' })
                  }}
                >
                </DapDSDatePickerReact>
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
                    const productFilter = e?.detail?.input;
                    if (productFilter) {
                      setFilter(productFilter);
                    }
                  }}
                  sync
                  placeholder="Válassz egy terméket">
                  
                  {data?.products?.map((item: Product) => (
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
            <Controller
              name="subject"
              control={control}
              render={({ field: { value } }) => (
                <DapDSInputReact
                  id="subject"
                  label="Tárgy"
                  optional
                  optionalLabel="(Nem kötelező)"
                  name="subject"
                  value={value}
                  onDdsChange={e => {
                    setValue('subject', e.detail.value)
                  }}></DapDSInputReact>
              )}
            />
            <Controller
              name="message"
              control={control}
              render={({ field: { value } }) => (
                <DapDSTextareaReact
                  id="message"
                  label="Üzenet"
                  name="message"
                  value={value}
                  feedback={errors?.message?.message?.toString()}
                  feedbackType="negative"
                  onDdsChange={e => {
                    setValue('message', e.detail.value, { shouldValidate: true })
                  }}></DapDSTextareaReact>
              )}
              rules={{
                validate: {
                  required: value => {
                    if (!value) return 'Írd be az üzeneted!'
                  },
                },
              }}
            />
            <Controller
              name="consent"
              control={control}
              render={({ field: { value } }) => (
                <DapDSCheckboxReact
                  id="consent"
                  label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
                  name="consent"
                  checked={value}
                  feedback={errors?.consent?.message?.toString()}
                  feedbackType="negative"
                  onDdsChange={e => {
                    setValue('consent', e.detail.checked, {
                      shouldValidate: true,
                    })
                  }}></DapDSCheckboxReact>
              )}
              rules={{
                validate: {
                  required: value => {
                    if (!value) return 'Fogadd el az Adatkezelési tájékoztatót!'
                  },
                },
              }}
            />
            <DapDSButtonReact htmlType="submit">Küldés</DapDSButtonReact>
          </DapDSStackReact>
        </form>
      </div>
    </>
  )
}
