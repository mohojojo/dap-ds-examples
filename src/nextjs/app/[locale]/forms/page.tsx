"use client"

import { useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import dayjs from "dayjs"
import { useTranslations, useLocale } from "next-intl"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const serviceOptions = [
  "idCard",
  "passport",
  "drivingLicense",
  "addressCard",
  "birthCertificate",
] as const

interface FormData {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  serviceType: string
  copies: string
  notes: string
  contactMethod: string
  newsletter: boolean
  termsAccepted: boolean
}

function useFormSchema() {
  const t = useTranslations("forms.validation")
  return z.object({
    fullName: z.string().min(1, t("fullNameRequired")).min(3, t("fullNameMin")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        t("emailInvalid"),
      ),
    phone: z
      .string()
      .refine(
        (val) => !val || /^\+?[\d\s()-]{7,}$/.test(val),
        t("phoneInvalid"),
      ),
    dateOfBirth: z.string().min(1, t("dateOfBirthRequired")),
    serviceType: z.string().min(1, t("serviceTypeRequired")),
    copies: z
      .string()
      .refine((val) => Number(val) >= 1, t("copiesMin"))
      .refine((val) => Number(val) <= 10, t("copiesMax")),
    notes: z.string(),
    contactMethod: z.string(),
    newsletter: z.boolean(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: t("termsRequired"),
    }),
  })
}

export default function FormsPage() {
  const t = useTranslations("forms")
  const snackbarRef = useRef<HTMLElement>(null)
  const locale = useLocale()
  const schema = useFormSchema()

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: '',
      serviceType: "",
      copies: "1",
      notes: "",
      contactMethod: "email",
      newsletter: false,
      termsAccepted: false,
    },
  })

  const values = watch()

  const onSubmit = useCallback(
    (_data: FormData) => {
      showDapSnackbar(t("snackbar.success"), { alertType: "successful" })
      reset()
    },
    [t, reset],
  )

  const onReset = useCallback(() => {
    reset()
  }, [reset])

  return (
    <>
      <dap-ds-official-website-banner></dap-ds-official-website-banner>
      <Header />
      <main id="main-content">
        <section className="w-full max-w-(--dds-containers-large) mx-auto px-4 py-12">
          <dap-ds-stack spacing={600}>
            {/* Page header */}
            <dap-ds-stack spacing={200}>
              <dap-ds-typography variant="h1">{t("title")}</dap-ds-typography>
              <dap-ds-typography variant="body-lg">
                {t("description")}
              </dap-ds-typography>
            </dap-ds-stack>

            {/* Personal information */}
            <dap-ds-stack spacing={400}>
              <dap-ds-typography variant="h3">
                {t("personal.title")}
              </dap-ds-typography>
              <dap-ds-divider></dap-ds-divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <dap-ds-input
                  label={t("personal.fullName")}
                  placeholder={t("personal.fullNamePlaceholder")}
                  value={values.fullName}
                  required
                  feedback={errors.fullName?.message}
                  feedbackType={errors.fullName ? "negative" : undefined}
                  ondds-input={(e: CustomEvent<{ value: string }>) =>
                    setValue("fullName", e.detail?.value ?? "", {
                      shouldValidate: !!errors.fullName,
                    })
                  }
                />

                <dap-ds-input
                  label={t("personal.email")}
                  placeholder={t("personal.emailPlaceholder")}
                  value={values.email}
                  required
                  feedback={errors.email?.message}
                  feedbackType={errors.email ? "negative" : undefined}
                  ondds-input={(e: CustomEvent<{ value: string }>) =>
                    setValue("email", e.detail?.value ?? "", {
                      shouldValidate: !!errors.email,
                    })
                  }
                />

                <dap-ds-input
                  label={t("personal.phone")}
                  placeholder={t("personal.phonePlaceholder")}
                  value={values.phone}
                  feedback={errors.phone?.message}
                  feedbackType={errors.phone ? "negative" : undefined}
                  ondds-input={(e: CustomEvent<{ value: string }>) =>
                    setValue("phone", e.detail?.value ?? "", {
                      shouldValidate: !!errors.phone,
                    })
                  }
                />

                <dap-ds-datepicker
                  label={t("personal.dateOfBirth")}
                  value={values.dateOfBirth}
                  required
                  locale={locale}
                  maxDate={dayjs().add(1, "month")}
                  minDate={dayjs().subtract(1, "month")}
                  feedback={errors.dateOfBirth?.message}
                  feedbackType={errors.dateOfBirth ? "negative" : undefined}
                />
              </div>
            </dap-ds-stack>

            {/* Service details */}
            <dap-ds-stack spacing={400}>
              <dap-ds-typography variant="h3">
                {t("service.title")}
              </dap-ds-typography>
              <dap-ds-divider></dap-ds-divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <dap-ds-select
                  label={t("service.serviceType")}
                  placeholder={t("service.serviceTypePlaceholder")}
                  value={values.serviceType}
                  required
                  feedback={errors.serviceType?.message}
                  feedbackType={errors.serviceType ? "negative" : undefined}
                  ondds-change={(e: CustomEvent<{ value: string }>) =>
                    setValue("serviceType", e.detail?.value ?? "", {
                      shouldValidate: !!errors.serviceType,
                    })
                  }
                >
                  {serviceOptions.map((key) => (
                    <dap-ds-option-item key={key} value={key}>
                      {t(`service.options.${key}`)}
                    </dap-ds-option-item>
                  ))}
                </dap-ds-select>

                <dap-ds-number-input
                  label={t("service.copies")}
                  value={values.copies}
                  min={1}
                  max={10}
                  required
                  feedback={errors.copies?.message}
                  feedbackType={errors.copies ? "negative" : undefined}
                  ondds-input={(e: CustomEvent<{ value: string }>) =>
                    setValue("copies", e.detail?.value ?? "1", {
                      shouldValidate: !!errors.copies,
                    })
                  }
                />
              </div>

              <dap-ds-textarea
                label={t("service.notes")}
                placeholder={t("service.notesPlaceholder")}
                value={values.notes}
                ondds-input={(e: CustomEvent<{ value: string }>) =>
                  setValue("notes", e.detail?.value ?? "")
                }
              />
            </dap-ds-stack>

            {/* Preferences */}
            <dap-ds-stack spacing={400}>
              <dap-ds-typography variant="h3">
                {t("preferences.title")}
              </dap-ds-typography>
              <dap-ds-divider></dap-ds-divider>

              <dap-ds-radio-group
                label={t("preferences.contactMethod")}
                value={values.contactMethod}
                ondds-change={(e: CustomEvent<{ value: string }>) =>
                  setValue("contactMethod", e.detail?.value ?? "email")
                }
              >
                <dap-ds-radio-button
                  value="email"
                  label={t("preferences.contactEmail")}
                ></dap-ds-radio-button>
                <dap-ds-radio-button
                  value="phone"
                  label={t("preferences.contactPhone")}
                ></dap-ds-radio-button>
                <dap-ds-radio-button
                  value="post"
                  label={t("preferences.contactPost")}
                ></dap-ds-radio-button>
              </dap-ds-radio-group>

              <dap-ds-switch
                label={t("preferences.newsletter")}
                description={t("preferences.newsletterDescription")}
                checked={values.newsletter}
                ondds-change={(e: CustomEvent<{ checked: boolean }>) =>
                  setValue("newsletter", e.detail?.checked ?? false)
                }
              />

              <div>
                <dap-ds-checkbox
                  label={t("preferences.termsAccept")}
                  checked={values.termsAccepted}
                  required
                  ondds-change={(e: CustomEvent<{ checked: boolean }>) =>
                    setValue("termsAccepted", e.detail?.checked ?? false, {
                      shouldValidate: !!errors.termsAccepted,
                    })
                  }
                />
                {errors.termsAccepted && (
                  <dap-ds-feedback feedbackType="negative">
                    {errors.termsAccepted.message}
                  </dap-ds-feedback>
                )}
              </div>
            </dap-ds-stack>

            {/* Actions */}
            <div className="flex gap-4">
              <dap-ds-button
                variant="primary"
                size="lg"
                onClick={() =>
                  handleSubmit(onSubmit, () => {
                    /* validation errors shown inline */
                  })()
                }
              >
                {t("submit")}
              </dap-ds-button>
              <dap-ds-button variant="secondary" size="lg" onClick={onReset}>
                {t("reset")}
              </dap-ds-button>
            </div>
          </dap-ds-stack>
        </section>

        <dap-ds-snackbar ref={snackbarRef} position="bottom-right" />
      </main>
      <Footer />
    </>
  )
}
