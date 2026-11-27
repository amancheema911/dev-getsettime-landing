import type { Metadata } from "next";
import Script from "next/script";
import CallToAction from "@/app/component/CallToAction";
import { APP_NAME, BASE_URL, REGISTER_URL, contactInfo } from "@/lib/config";
import ScreenGate from "@/app/component/ScreenGate";
import Heading from "@/app/component/Heading";
import SigngoogleButton from "@/app/component/ui/button/SigngoogleButton";
import Button from "@/app/component/ui/button/Button";
import FeatureHeroPreview from "@/app/component/FeatureHeroPreview";
import Eventtype from "./Eventtype";
import TeamsServices from "./TeamsServices";


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


export default function FeaturesNewPage() {
  return (
    <> 
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
                badge="Appointment tools for service businesses"
                title="Make It Easy to Book."
                highlightText="Keep Your Day in Order."
                description="Give clients a simple way to book and pay online. Whether you run a salon, wellness studio, fitness business, or consultancy, you can manage appointments and payments in Getsettime and spend more time with clients."
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
              <FeatureHeroPreview />
            </div>
          </div>
        </div>
      </section> 

      <Eventtype />

      <TeamsServices />

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
