"use client"

import { useTranslations } from "next-intl"

export default function LatestNews() {
  const t = useTranslations("news")

  const newsItems = [
    {
      title: t("items.0.title"),
      subtitle: t("items.0.subtitle"),
      date: t("items.0.date"),
      category: t("items.0.category"),
    },
    {
      title: t("items.1.title"),
      subtitle: t("items.1.subtitle"),
      date: t("items.1.date"),
      category: t("items.1.category"),
    },
    {
      title: t("items.2.title"),
      subtitle: t("items.2.subtitle"),
      date: t("items.2.date"),
      category: t("items.2.category"),
    },
  ]

  return (
    <section className="py-12" id="hirek">
      <div className="w-full max-w-(--dds-containers-xlarge) mx-auto px-4">
        <dap-ds-typography variant="h2" class="text-center">
          {t("title")}
        </dap-ds-typography>
        <div className="card-grid-news">
          {newsItems.map((news, index) => (
            <dap-ds-card key={index} interactive renderAs="a" href="#">
              <dap-ds-card-image>
                <div className="relative w-full">
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--dds-background-brand-strong-inverted, #3730a3) 0%, var(--dds-background-brand-base-inverted, #4f46e5) 100%)",
                      height: "180px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <dap-ds-icon size="xxl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="var(--dds-text-neutral-on-inverted, #f3f4f6)"
                      >
                        <path d="M16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V10H22V19C22 20.6569 20.6569 22 19 22ZM18 12V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V12H18ZM6 6H12V12H6V6ZM8 8V10H10V8H8ZM6 13H14V15H6V13ZM6 16H14V18H6V16Z"></path>
                      </svg>
                    </dap-ds-icon>
                  </div>
                  <div className="absolute top-3 right-3">
                    <dap-ds-badge variant="information">
                      {news.category}
                    </dap-ds-badge>
                  </div>
                </div>
              </dap-ds-card-image>
              <dap-ds-card-subtitle>{news.subtitle}</dap-ds-card-subtitle>
              <dap-ds-card-title>{news.title}</dap-ds-card-title>
              <dap-ds-card-content>
                <dap-ds-typography
                  variant="description"
                  size="sm"
                >
                  {news.date}
                </dap-ds-typography>
              </dap-ds-card-content>
            </dap-ds-card>
          ))}
        </div>
      </div>
    </section>
  )
}
