import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { APP_NAME, BASE_URL, contactInfo, LOGIN_URL } from "@/lib/config";
import { blogPosts } from "@/lib/blog-data";
import { BlogList } from "../component/BlogList";
import Heading from "../component/Heading";
import CallToAction from "../component/CallToAction";

function BlogListSkeleton() {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-24 bg-neutral-200 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden drop-shadow-md">
            <div className="h-52 bg-neutral-200 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
              <div className="h-6 w-full bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageUrl = `${BASE_URL}/blog`;

export const metadata: Metadata = {
  title: `Blog | Scheduling Tips, Best Practices & Industry Insights`,
  description: `Explore the ${APP_NAME} blog for expert scheduling tips, industry best practices, product updates, and insights to help you manage appointments more efficiently.`,
  keywords: [ "appointment scheduling blog", "scheduling tips", "booking best practices", "calendar management", "business scheduling", "no-show reduction", "team scheduling", "healthcare scheduling"],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `Blog | Scheduling Tips, Best Practices & Industry Insights`,
    description: `Explore the ${APP_NAME} blog for expert scheduling tips, industry best practices, product updates, and insights to help you manage appointments more efficiently.`,
    url: pageUrl,
    type: "website",
    siteName: `${APP_NAME}`,
    locale: "en",
    images: [
      {
        url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `Blog | Scheduling Tips, Best Practices & Industry Insights`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: pageUrl,
    creator: `${BASE_URL}`,
    title: `Blog | Scheduling Tips, Best Practices & Industry Insights`,
    description: `Explore the ${APP_NAME} blog for expert scheduling tips, industry best practices, product updates, and insights to help you manage appointments more efficiently.`,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

const faqItems = [
  {
    title: "Does GetSetTime offer online appointment booking for doctors?",
    content: "Yes, GetSetTime offers online appointment booking for doctors, wellness instructors, gym trainers, and other healthcare professionals.",
  },
]

export default function BlogPage() {
  
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": `${APP_NAME}`,
        "url": `${BASE_URL}`,
        "image": {
          "@type": "ImageObject",
          "url": `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          "width": 1200,
          "height": 630
        },
        "description": "GetSetTime is a smart appointment scheduling platform trusted by doctors, salon owners, and wellness professionals. Simple to set up, smart enough to run itself.",
        "slogan": "Precision Scheduling for Modern Care",
        "foundingDate": "2025",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10"
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
            "areaServed": "Worldwide"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/getsettime",
          "https://x.com/getsettime",
          "https://www.instagram.com/getsettime",
          "https://www.youtube.com/@GetSetTime"
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": `${pageUrl}`,
        "name": `Blog | ${APP_NAME}`,
        "description": `Explore the ${APP_NAME} blog for expert scheduling tips and best practices.`,
        "isPartOf": {
          "@id": `${BASE_URL}/#website`
        },
        "about": {
          "@id": `${BASE_URL}/#softwareapplication`
        },
        "mainEntity": {
          "@id": `${pageUrl}/#collectionpage`
        },
        "publisher": {
          "@id": `${BASE_URL}/#organization`
        },
        "inLanguage": "en",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          "width": 1200,
          "height": 630
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${BASE_URL}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": pageUrl
            }
          ]
        }
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}/#collectionpage`,
        "url": pageUrl,
        "name": `Blog | ${APP_NAME}`,
        "description": "Collection of articles about appointment scheduling and business management",
        "isPartOf": {
          "@id": `${BASE_URL}/#website`
        },
        "about": {
          "@id": `${BASE_URL}/#softwareapplication`
        },
        "mainEntity": {
          "@type": "ItemList",
          "@id": `${pageUrl}/#bloglist`,
          "name": "Blog Articles",
          "numberOfItems": blogPosts.length,
          "itemListOrder": "https://schema.org/ItemListOrderAscending",
          "itemListElement": blogPosts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${BASE_URL}/blog/${post.slug}`,
            "name": post.title
          }))
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faqpage`,
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.title,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.content
          }
        }))
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <Script id="blog-page-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}/>

      <section className="relative py-12">
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Heading
              badge="Articles"
              title="Insights & Resources for"
              highlightText="Smarter Scheduling"
              description="Discover expert tips, industry best practices, and the latest insights to help you streamline your appointment management and grow your business."
              headingTag="h1"
              titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
            />
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="relative pb-14 sm:pb-20">
        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<BlogListSkeleton />}>
              <BlogList posts={blogPosts} postsPerPage={12} />
            </Suspense>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CallToAction
        badge="Built for Modern Business"
        title="What would your day look like with less time spent scheduling?"
        description="Switch your manual operations to a unified scheduling platform to meet modern needs like online booking, reminders and more."
        buttonLink={`${LOGIN_URL}`}
        buttonText="Sign Up for Free"
        buttonAriaLabel="Get Started - Home"
        buttonSource="home-cta"
        buttonTone="light"
        highlights={["Online booking", "Auto reminders", "Team calendar"]}
      />
    </>
  );
}