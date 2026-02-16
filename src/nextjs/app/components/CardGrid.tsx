"use client"

import { useTranslations } from "next-intl"

interface CardItem {
  key: string
  icon: string
  href: string
}

interface CardGridProps {
  titleKey: string
  items: CardItem[]
  translationNamespace: string
  sectionId: string
  gridClassName: string
}

export default function CardGrid({
  titleKey,
  items,
  translationNamespace,
  sectionId,
  gridClassName,
}: CardGridProps) {
  const t = useTranslations(translationNamespace)

  const isSvgIcon = (icon: string) => icon.trim().startsWith("<svg")

  return (
    <section
      className="w-full max-w-(--dds-containers-xlarge) my-0 mx-auto px-4 py-12"
      id={sectionId}
    >
      <dap-ds-typography variant="h2" class="text-center">
        {t(titleKey)}
      </dap-ds-typography>
      <div className={gridClassName}>
        {items.map((item) => (
          <dap-ds-card
            key={item.href}
            interactive
            renderAs="a"
            href={item.href}
          >
            <dap-ds-card-content>
              <div className="flex flex-col items-center gap-2">
                {isSvgIcon(item.icon) ? (
                  <div
                    className="inline-block size-1/2 mt-(--dds-spacing-400) text-(--dds-text-neutral-strong)"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                ) : (
                  <div className="inline-block size-1/2 mt-(--dds-spacing-400) text-(--dds-text-neutral-strong)">
                    <dap-ds-icon
                      icon={item.icon}
                      size="xl"
                      style={{ color: 'var(--dds-text-neutral-strong)' }}
                    />
                  </div>
                )}
                <dap-ds-typography
                  variant="body"
                  style={{ textAlign: "center" }}
                >
                  {t(item.key)}
                </dap-ds-typography>
              </div>
            </dap-ds-card-content>
          </dap-ds-card>
        ))}
      </div>
    </section>
  )
}
