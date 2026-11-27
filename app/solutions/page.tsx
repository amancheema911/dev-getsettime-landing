import type { Metadata } from "next";
import Script from "next/script";
import { APP_NAME, BASE_URL, contactInfo } from "@/lib/config";
import { hubSolutions, platformBenefits } from "@/lib/solutions-hub-data";
import Heading from "@/app/component/Heading";
import SolutionCtaSection from "@/app/component/SolutionCtaSection";
import IndustryProfessionGrid from "@/app/component/IndustryProfessionGrid";
import { PlatformBenefits, SolutionCardGrid } from "./SolutionCard";
import SolutionsHeroPreview from "@/app/component/SolutionsHeroPreview";
import BookingTypesSection from "./BookingTypesSection";
import SigngoogleButton from "@/app/component/ui/button/SigngoogleButton";
import Button from "@/app/component/ui/button/Button";
import ScreenGate from "@/app/component/ScreenGate";
import { REGISTER_URL } from "@/lib/config";

const pageUrl = `${BASE_URL}/solutions`;

export const metadata: Metadata = {
  title: `All Business Types | ${APP_NAME}`,
  description: `All-in-one appointment scheduling software for clinics, dentists, therapists, and salons—featuring online booking, WhatsApp reminders, and sync.`,
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
    description: `All-in-one appointment scheduling software for clinics, dentists, therapists, and salons—featuring online booking, WhatsApp reminders, and sync.`,
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
    description: `All-in-one appointment scheduling software for clinics, dentists, therapists, and salons—featuring online booking, WhatsApp reminders, and sync.`,
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
        "description": "GetSetTime is a smart appointment scheduling platform trusted by doctors, salon owners, and wellness professionals. Simple to set up, smart enough to run itself.",
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
         {/* HERO SECTION */}
        <section className="relative overflow-hidden py-14 sm:py-20">          
          <div className="absolute inset-0 hidden sm:block">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/3 -translate-y-1/2 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-6">
              {/* Left column - Content */}
              <div className="space-y-6">
                <Heading
                  badge="Built for every service business"
                  title="Scheduling Software That"
                  highlightText="Fits the Way You Work"
                  description="Let clients book and pay online while you focus on delivering your services. From salons and wellness studios to fitness businesses and consultancies, manage appointments and payments in one place."
                  headingTag="h1"
                  titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
                />
                <div className="flex gap-2 max-[425px]:flex-col flex-row flex-wrap">
                  <SigngoogleButton signupSource="" />
                  <Button buttonLink={`${REGISTER_URL}`} buttonText="Get Started for Free" ariaLabel="Get Started for Free" source="" tone="dark" />
                </div>

                <ScreenGate minWidth={768}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 3v3m8-3v3M4 9h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                </svg>
                            </span>
                            <div>
                                <div className="text-lg font-bold text-neutral-900">24/7</div>
                                <div className="text-xs font-semibold text-neutral-800">Online booking</div>
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500">Book a visit without calling</div>
                    </div>

                    <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <div>
                                <div className="text-lg font-bold text-neutral-900">3 hrs</div>
                                <div className="text-xs font-semibold text-neutral-800">Time Saved</div>
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500">Daily admin time back for your team</div>
                    </div>

                    <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                      <div className="flex items-center gap-2">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
                              </svg>
                          </span>
                          <div>
                              <div className="text-lg font-bold text-neutral-900">60%</div>
                              <div className="text-xs font-semibold text-neutral-800">Fewer no-shows</div>
                          </div>
                      </div>
                      <div className="text-xs text-neutral-500">Reminders go out before every patient visit</div>
                  </div>
                  </div>
                </ScreenGate>
              </div>

              {/* Right column - Interactive Demo */}
              <div className="relative">
                <SolutionsHeroPreview />
              </div>
            </div>
          </div>
        </section>       

        <section className="relative overflow-hidden bg-slate-50 py-12 sm:py-16" aria-labelledby="industries-heading">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" aria-hidden />
          <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Heading
                  badge="Industry solutions"
                  title="Choose the solution for"
                  highlightText="your business"
                  description="These scheduling pages on the same platform. Each one is written for a different way of booking."
                  titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
                />
            </div>
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
              <IndustryProfessionGrid />
            </div>
          </div>
        </section>

        <BookingTypesSection />

        <section className="bg-gradient-to-b from-white to-indigo-50 overflow-hidden py-14 sm:py-16 lg:py-20" aria-labelledby="platform-benefits-heading">
          <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <Heading            
              title="What every team gets"
              description="Industry pages change the workflow. The scheduling tools underneath stay the same for every team."
              wrapperClassName="text-center max-w-4xl mx-auto mb-8 space-y-3"
            />
            <div className="mt-8 sm:mt-10">
              <PlatformBenefits benefits={platformBenefits} />
            </div>
          </div>
        </section>

        <SolutionCtaSection />
    </>
  );
}
