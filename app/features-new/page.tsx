import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CallToAction from "@/app/component/CallToAction";
import Heading from "@/app/component/Heading";
import Button from "@/app/component/ui/button/Button";
import { APP_NAME, BASE_URL, REGISTER_URL, contactInfo } from "@/lib/config";
import FeatureFaqs from "./FeatureFaqs";
import FeatureNav from "./FeatureNav";
import { featureSections, productDemos, solutionLinks } from "./feature-data";

const pageUrl = `${BASE_URL}/features-new`;
const pageTitle = `Appointment Features | ${APP_NAME}`;
const pageDescription =
  "Discover the scheduling tools that help your business manage online bookings, coordinate teams, control availability and keep customers informed.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    siteName: APP_NAME,
    locale: "en",
    images: [
      {
        url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "GetSetTime workspace dashboard showing bookings, the public booking preview, and connected calendar and reminder status.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

const heroPoints = [
  "Public booking page",
  "Team calendar",
  "Working hours and buffers",
  "Email and WhatsApp updates",
];

function ProductShot({
  imageClassName,
  alt,
  caption,
  priority = false,
}: {
  imageClassName: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-neutral-200 bg-white drop-shadow-xl">
      <div className="relative aspect-[16/10]">
        <Image
          src="/dashboard.webp"
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, 100vw"
          className={`object-cover ${imageClassName}`}
        />
      </div>
      <figcaption className="border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function FeaturesNewPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: { "@id": `${pageUrl}/#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Features", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: featureSections.flatMap((section) =>
          section.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        ),
      },
    ],
  };

  return (
    <>
      <Script
        id="features-new-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className="absolute inset-0 -z-10 hidden sm:block">
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/3 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto container grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="space-y-6">
            <Heading
              badge="features"
              title="Everything You Need to Manage Your"
              highlightText="Appointments"
              description="Discover the scheduling tools that help your business manage online bookings, coordinate teams, control availability and keep customers informed."
              headingTag="h1"
              titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                buttonLink={`${REGISTER_URL}`}
                buttonText="Start Free"
                ariaLabel="Start free with GetSetTime"
                source="features-new"
                tone="primary"
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {heroPoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 px-2 py-1.5 text-xs text-neutral-700 drop-shadow-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <ProductShot
            priority
            imageClassName="object-left-top"
            alt="GetSetTime workspace dashboard showing today’s bookings, a live public booking preview, the team sidebar, and Google Calendar, WhatsApp, and email status."
            caption="The GetSetTime workspace, including the public booking preview."
          />
        </div>
      </section>

      <FeatureNav />

      {featureSections.map((section, index) => {
        const reversed = index % 2 === 1;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative scroll-mt-40 overflow-hidden py-14 sm:py-20 ${index % 2 === 0 ? "bg-white" : "bg-[#f5f7ff]"}`}
          >
            {index % 2 === 1 && (
              <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
                <div className="absolute left-[-120px] top-[-80px] h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="absolute right-[-80px] bottom-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
              </div>
            )}
            <div className="relative mx-auto container grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={reversed ? "lg:order-2" : ""}>
                <Heading
                  badge={section.eyebrow}
                  title={section.title}
                  description={section.description}
                  wrapperClassName="space-y-3"
                  titleClassName="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl"
                />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.points.map((point) => (
                    <li key={point.title} className="rounded-xl border border-neutral-100 bg-white p-4 drop-shadow-sm">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-indigo-600" aria-hidden>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        </span>
                        <h3 className="text-sm font-semibold text-neutral-900 sm:text-[15px]">{point.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl border border-indigo-100 bg-white p-4 drop-shadow-sm">
                  <p className="text-sm text-neutral-600">{section.demoNote}</p>
                  <Link
                    href={section.demoHref}
                    className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                  >
                    {section.demoLabel}
                  </Link>
                </div>
              </div>
              <div className={reversed ? "lg:order-1" : ""}>
                <ProductShot
                  imageClassName={section.imageClassName}
                  alt={section.imageAlt}
                  caption={section.caption}
                />
              </div>
            </div>
          </section>
        );
      })}

      <section id="feature-faqs" className="relative scroll-mt-40 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)] py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
          <div className="absolute left-[-6rem] top-20 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute right-[-3rem] top-10 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
          <Heading
            badge="Frequently Asked Questions"
            title="Questions about these features"
            description="Answers describe the booking, team, availability, notification, and calendar behavior that is implemented in GetSetTime."
            wrapperClassName="mx-auto max-w-3xl space-y-3 text-center"
            titleClassName="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl lg:text-[40px]"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {featureSections.map((section) => (
              <div key={section.id}>
                <h3 className="mb-3 text-lg font-bold text-neutral-900">
                  <a href={`#${section.id}`} className="rounded-md hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2">
                    {section.navLabel}
                  </a>
                </h3>
                <FeatureFaqs groupId={section.id} items={section.faqs} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product-demos" className="relative scroll-mt-40 overflow-hidden bg-white py-14 sm:py-20">
        <div className="pointer-events-none absolute top-10 left-10 hidden h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl sm:block" aria-hidden />
        <div className="pointer-events-none absolute right-10 bottom-10 hidden h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl sm:block" aria-hidden />
        <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
          <Heading
            badge="Product demo"
            title="Watch the product"
            description="These are recorded walkthroughs of the production booking flow, including Google Meet setup and the confirmation email."
            wrapperClassName="mx-auto mb-10 max-w-3xl space-y-3 text-center"
            titleClassName="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl lg:text-[40px]"
          />

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white drop-shadow-xl">
            <iframe
              src={productDemos[0].embed ?? undefined}
              title={productDemos[0].embedTitle ?? productDemos[0].title}
              allow="fullscreen; encrypted-media"
              className="aspect-video min-h-[240px] w-full bg-neutral-100"
            />
          </div>

          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {productDemos.map((demo) => (
              <li key={demo.href} className="group relative rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-50 p-1 transition duration-300 hover:-translate-y-1 hover:drop-shadow-xl">
                <div className="flex h-full flex-col rounded-xl bg-white p-5 drop-shadow-lg">
                  <h3 className="text-base font-semibold text-neutral-900">{demo.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{demo.description}</p>
                  <Link
                    href={demo.href}
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    Open walkthrough
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-indigo-50 px-4 py-8">
            <h3 className="text-center text-sm font-semibold text-neutral-600">Scheduling pages by industry</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-xl border border-white bg-white px-4 text-sm font-semibold text-neutral-900 drop-shadow-sm transition hover:-translate-y-0.5 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CallToAction
        badge="Start with a live booking page"
        title="Ready for GetSetTime to manage your appointments"
        description="Create a workspace, add your services and hours, and share the public booking link. Upgrade from pricing when the team needs more seats."
        buttonLink={`${REGISTER_URL}`}
        buttonText="Start Free"
        buttonAriaLabel="Start free with GetSetTime"
        buttonSource="features-new-cta"
        buttonTone="light"
        highlights={["Public booking page", "Team calendar", "Email and WhatsApp updates"]}
      />
    </>
  );
}
