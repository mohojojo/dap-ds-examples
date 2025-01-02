// @ts-nocheck
'use client';

import { Controller, useForm } from 'react-hook-form';
import './globals.css';

export default function Home() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: unknown) => {
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
                ondds-change={e => {
                  console.log('dap-ds-input név');
                  setValue('name', e.detail.value, { shouldValidate: true });
                }}></dap-ds-input>
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
                <dap-ds-select
                  id="prefix"
                  label="Megnevezés"
                  name="prefix"
                  value={value}
                  feedback={errors?.prefix?.message?.toString()}
                  feedbackType="negative"
                  ondds-change={e => {
                    setValue('prefix', e.detail.value)
                  }}>
                    <dap-ds-option-item value="mr">Úr</dap-ds-option-item>
                    <dap-ds-option-item value="mrs">Hölgy</dap-ds-option-item>
                    <dap-ds-option-item value="miss">Kisasszony</dap-ds-option-item>
                </dap-ds-select>
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
                <dap-ds-input
                  id="email"
                  label="E-mail cím"
                  name="email"
                  value={value}
                  type="email"
                  feedback={errors?.email?.message?.toString()}
                  feedbackType="negative"
                  ondds-change={e => {
                    setValue('email', e.detail.value, { shouldValidate: true })
                  }}></dap-ds-input>
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
                <dap-ds-datepicker
                  id="datepicker"
                  label="Születési dátum"
                  description="Add meg a születési dátumod!"
                  name="datepicker"
                  value={value}
                  feedback={errors?.datepicker?.message?.toString()}
                  feedbackType={errors?.datepicker ? 'negative' : 'positive'}
                  ondds-change={(e) => {
                    console.log(e)
                    setValue('datepicker', e.detail.value, { shouldValidate: true })}
                  }
                  ondds-invaliddate={(e) => {
                    console.log(e)
                    if (e.detail.type === 'invalid') {
                      setError('datepicker', { message: `Érvénytelen dátum: ${dayjs.Ls[dayjs.locale()].formats.L}` })
                    }

                    if (e.detail.type === 'out-of-range') {
                      setError('datepicker', { message: 'Nem választható dátum!' })
                    }
                  }}
                  ondds-validdate={(e) => {
                    console.log(e)
                    setError('datepicker', { message: '' })
                  }}
                >
                </dap-ds-datepicker>
              )}
              rules={{
                validate: {
                  required: value => {
                    if (!value) return 'Add meg a születési dátumod!'
                  },
                },
              }}
            />
          <dap-ds-combobox
            label="Termék megnevezés"
            required
            sync
            feedbackType="negative"
            placeholder="Válassz egy terméket"
          >
          </dap-ds-combobox>
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
                  ondds-change={e => {
                    setValue('subject', e.detail.value)
                  }}></dap-ds-input>
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
                  ondds-change={e => {
                    setValue('message', e.detail.value, { shouldValidate: true })
                  }}></dap-ds-textarea>
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
                <dap-ds-checkbox
                  id="consent"
                  label="Megnyitottam, elolvastam és elfogadom az Adatkezelési tájékoztatót."
                  name="consent"
                  checked={value}
                  feedback={errors?.consent?.message?.toString()}
                  feedbackType="negative"
                  ondds-change={e => {
                    setValue('consent', e.detail.checked, {
                      shouldValidate: true,
                    })
                  }}></dap-ds-checkbox>
              )}
              rules={{
                validate: {
                  required: value => {
                    if (!value) return 'Fogadd el az Adatkezelési tájékoztatót!'
                  },
                },
              }}
            />
          <dap-ds-button htmlType="submit">Küldés</dap-ds-button>
        </dap-ds-stack>
      </form>
    </div>
  );
}
