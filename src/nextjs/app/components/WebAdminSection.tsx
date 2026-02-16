'use client'

import { useTranslations } from 'next-intl'

const adminServices = [
  {
    key: 'localGov',
    icon: 'government-line',
    href: '#onkormanyzat',
  },
  {
    key: 'statePortal',
    icon: 'global-line',
    href: '#allami-portal',
  },
]

export default function WebAdminSection() {
  const t = useTranslations('webAdmin')

  return (
    <section className="w-full max-w-(--dds-containers-xlarge) mx-auto px-4 py-12">
      <dap-ds-typography variant="h2" class="text-center">
        {t('title')}
      </dap-ds-typography>
      <div className="card-grid-admin">
        {adminServices.map((service) => (
          <dap-ds-card
            key={service.href}
            interactive
            renderAs="a"
            href={service.href}
          >
            <dap-ds-card-content>
              <div className="flex items-start gap-4">
                <dap-ds-icon
                  icon={service.icon}
                  size="xl"
                  style={{ color: 'var(--dds-indigo-600, #4f46e5)' }}
                ></dap-ds-icon>
                <dap-ds-stack spacing={100}>
                  <dap-ds-typography variant="h4">
                    {t(`${service.key}.title`)}
                  </dap-ds-typography>
                  <dap-ds-typography variant="body-md">
                    {t(`${service.key}.description`)}
                  </dap-ds-typography>
                </dap-ds-stack>
              </div>
            </dap-ds-card-content>
          </dap-ds-card>
        ))}
      </div>
    </section>
  )
}
