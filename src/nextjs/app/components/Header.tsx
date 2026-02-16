"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations, useLocale } from "next-intl"
import ThemeCommand from "./ThemeCommand"
import LanguageSwitcher from "./LanguageSwitcher"

function useLoginSchema() {
  const t = useTranslations("header.validation")
  return z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .refine(
        (val) => val.includes("@") || val.length >= 3,
        t("emailInvalid")
      ),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(6, t("passwordMinLength")),
  })
}

type LoginFormData = { email: string; password: string }

export default function Header() {
  const t = useTranslations("header")
  const locale = useLocale()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const loginSchema = useLoginSchema()

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const loginEmail = watch("email")
  const loginPassword = watch("password")

  const openLoginModal = () => {
    reset()
    setIsLoginModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    reset()
  }

  const onLoginSubmit = (data: LoginFormData) => {
    // TODO: submit login (data.email, data.password)
    closeLoginModal()
  }

  const navItems = [
    { label: t("nav.lifeEvents"), href: `/${locale}/#elethelyzetek` },
    { label: t("nav.services"), href: `/${locale}/adatok` },
    { label: t("nav.forms"), href: `/${locale}/forms` },
  ]

  return (
    <header className="border-b border-gray-200">
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <dap-ds-dap-badge size="lg"></dap-ds-dap-badge>
        </div>

        {/* Desktop navigation */}
        <dap-ds-navigation-menu
          orientation="horizontal"
          className="hidden md:block"
        >
          {navItems.map((item) => (
            <dap-ds-navigation-menu-item key={item.href}>
              <dap-ds-button
                slot="trigger"
                href={item.href}
                variant="subtle-menu"
                noUnderline
              >
                <span>{item.label}</span>
              </dap-ds-button>
            </dap-ds-navigation-menu-item>
          ))}
          <dap-ds-navigation-menu-item>
            <dap-ds-button
              slot="trigger"
              variant="subtle-menu"
              noUnderline
              onClick={openLoginModal}
            >
              <span>{t("loginModal")}</span>
            </dap-ds-button>
          </dap-ds-navigation-menu-item>
        </dap-ds-navigation-menu>

        {/* Theme switcher + language (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeCommand />
        </div>
        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeCommand />
          <dap-ds-icon-button
            icon="menu-line"
            label={t("menuOpen")}
            variant="ghost"
            size="lg"
            onClick={() => setIsMobileMenuOpen(true)}
          ></dap-ds-icon-button>
        </div>
      </div>

      {/* Mobile tray menu */}
      <dap-ds-tray
        open={isMobileMenuOpen}
        placement="right"
        title={t("menuTitle")}
        hideOkButton
        hideCancelButton
        ondds-close={() => setIsMobileMenuOpen(false)}
      >
        <dap-ds-navigation-menu orientation="vertical" fullWidth>
          {navItems.map((item) => (
            <dap-ds-navigation-menu-item key={item.href}>
              <dap-ds-link slot="trigger" href={item.href}>
                {item.label}
              </dap-ds-link>
            </dap-ds-navigation-menu-item>
          ))}
        </dap-ds-navigation-menu>
        <div className="mt-6 px-2 flex flex-col gap-2">
          <dap-ds-button variant="primary" fullWidth onClick={openLoginModal}>
            {t("login")}
          </dap-ds-button>
          <dap-ds-button variant="secondary" fullWidth>
            {t("downloadApp")}
          </dap-ds-button>
        </div>
      </dap-ds-tray>

      {/* Login modal */}
      <dap-ds-modal
        open={isLoginModalOpen}
        title={t("login")}
        okButtonLabel={t("login")}
        okButtonSizeMap="sm:lg"
        cancelButtonSizeMap="sm:lg"
        closeButtonSizeMap="sm:lg"
        cancelButtonLabel={t("loginForm.cancel")}
        ondds-close={closeLoginModal}
        ondds-cancel={closeLoginModal}
        ondds-ok={(e: Event) => {
          e.preventDefault()
          handleSubmit(onLoginSubmit, () => {
            /* validation failed, modal stays open */
          })()
        }}
      >
        <dap-ds-stack className="py-2">
          <div>
            <dap-ds-input
              id="login-email"
              label={t("loginForm.emailLabel")}
              description={t("loginForm.emailDescription")}
              placeholder={t("loginForm.emailPlaceholder")}
              value={loginEmail}
              feedback={errors.email?.message}
              feedbackType={errors.email ? "negative" : undefined}
              ondds-input={(e: CustomEvent<{ value: string }>) =>
                setValue("email", e.detail?.value ?? "")
              }
            />
          </div>
          <div>
            <dap-ds-password-input
              id="login-password"
              label={t("loginForm.passwordLabel")}
              description={t("loginForm.passwordDescription")}
              placeholder={t("loginForm.passwordPlaceholder")}
              value={loginPassword}
              feedback={errors.password?.message}
              feedbackType={errors.password ? "negative" : undefined}
              ondds-input={(e: CustomEvent<{ value: string }>) =>
                setValue("password", e.detail?.value ?? "")
              }
            />
          </div>
        </dap-ds-stack>
      </dap-ds-modal>
    </header>
  )
}
