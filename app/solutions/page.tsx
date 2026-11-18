import type { Metadata } from "next";
import Script from "next/script";
import { APP_NAME, BASE_URL, contactInfo } from "@/lib/config";
import { hubSolutions, platformBenefits } from "@/lib/solutions-hub-data";
import Heading from "@/app/component/Heading";
import SolutionCtaSection from "@/app/component/SolutionCtaSection";
import { PlatformBenefits, SolutionCardGrid } from "./SolutionCard";

const pageUrl = `${BASE_URL}/solutions`;

export const metadata: Metadata = {
  title: `All Business Types | ${APP_NAME}`,
  description: `${APP_NAME} is the one-stop appointment scheduling solution for service businesses — medical clinics, dentists, physiotherapists, salons, and more. Online booking, WhatsApp reminders, and smart calendars.`,
  keywords: [
    "appointment scheduling software",
    "business types",
    "doctor booking software",
    "dental appointment software",
    "salon scheduling software",
    "service business booking",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `All Business Types | ${APP_NAME}`,
    description: `${APP_NAME} is the one-stop appointment scheduling solution for service businesses — medical clinics, dentists, physiotherapists, salons, and more. Online booking, WhatsApp reminders, and smart calendars.`,
    url: pageUrl,
    type: "website",
    siteName: APP_NAME,
    locale: "en",
    images: [
      {
        url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `All Business Types | ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Business Types | ${APP_NAME}`,
    description: `${APP_NAME} is the one-stop appointment scheduling solution for service businesses — medical clinics, dentists, physiotherapists, salons, and more. Online booking, WhatsApp reminders, and smart calendars.`,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

export default function SolutionsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": APP_NAME,
        "url": BASE_URL,
        "image": {
          "@type": "ImageObject",
          "url": `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          "width": 1200,
          "height": 630,
        },
        "description": "GetSetTime is a smart appointment scheduling platform trusted by 5,000+ doctors, salon owners, and wellness professionals. Simple to set up, smart enough to run itself.",
        "slogan": "Precision Scheduling for Modern Care",
        "foundingDate": "2025",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10",
        },
        "areaServed": "Worldwide",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": ["English", "Hindi", "Punjabi"],
            "areaServed": "Worldwide",
          },
          {
            "@type": "ContactPoint",
            "contactType": "sales",
            "availableLanguage": ["English", "Hindi", "Punjabi"],
            "areaServed": "Worldwide",
          },
        ],
        "sameAs": [
          "https://www.facebook.com/getsettime",
          "https://x.com/getsettime",
          "https://www.instagram.com/getsettime",
          "https://www.youtube.com/@GetSetTime",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": `${BASE_URL}`,
        "name": `${APP_NAME}`,
        "alternateName": `${APP_NAME}`,
        "publisher": {
          "@id": `${BASE_URL}/#organization`
        },
        "description": "Smart appointment automation for doctors, clinics, salons, and service professionals. Set up fast, reduce no-shows, and start scheduling automatically.",
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${BASE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": `All Business Types | ${APP_NAME}`,
        "description": `${APP_NAME} is the one-stop appointment scheduling solution for service businesses — medical clinics, dentists, physiotherapists, salons, and more. Online booking, WhatsApp reminders, and smart calendars.`,
        "inLanguage": "en",
        "isPartOf": {
          "@type": "WebSite",
          "name": APP_NAME,
          "url": BASE_URL,
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          "width": 1200,
          "height": 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "All Business Types", item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#solutions`,
        "name": `${APP_NAME} Industry Solutions`,
        "numberOfItems": hubSolutions.length,
        "itemListElement": hubSolutions.map((solution, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": solution.title,
          "url": `${BASE_URL}${solution.href}`,
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="solutions-page-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

        <section className="border-b border-neutral-200 bg-white">
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl"></div>
            <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_55%)]"></div>
          </div>

          <div className="mx-auto container px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <Heading
                badge="Industry solutions"
                title="Appointment scheduling software for"
                highlightText="clinics, salons, and tutors"
                headingTag="h1"
                description="GetSetTime is built for service businesses in the United States — salons, beauty studios, wellness teams, tutors, and clinics. Share one booking link, send reminders, and keep every calendar in sync. Choose the industry that matches how you work."
                titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
              />
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-14 sm:py-16 lg:py-20" aria-labelledby="solutions-grid-heading">
          <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Heading
                title="Choose the solution for your business"
                description="Six scheduling pages on the same platform. Each one is written for a different way of booking."
                headingTag="h2"
              />
            </div>
            <div className="mt-8 sm:mt-10">
              <SolutionCardGrid solutions={hubSolutions} />
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="platform-benefits-heading">
          <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 id="platform-benefits-heading" className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                What every team gets
              </h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Industry pages change the workflow. The scheduling tools underneath stay the same for every team.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <PlatformBenefits benefits={platformBenefits} />
            </div>
          </div>
        </section>

        <SolutionCtaSection />
    </>
  );
}
