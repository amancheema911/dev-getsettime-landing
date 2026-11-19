import type { Metadata } from "next";
import { APP_NAME, BASE_URL, contactInfo, LOGIN_URL } from "@/lib/config";
import Heading from "../component/Heading";
import PrivacyPolicyContent from "../component/PrivacyPolicyContent";
import CallToAction from "../component/CallToAction";

const pageUrl = `${BASE_URL}/privacy-policy`;

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_NAME}`,
  description: `Learn how ${APP_NAME} collects, uses, and protects your personal information. Our privacy policy explains your rights and our data practices.`,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `Privacy Policy | ${APP_NAME}`,
    description: `Learn how ${APP_NAME} collects, uses, and protects your personal information. Our privacy policy explains your rights and our data practices.`,
    url: pageUrl,
    type: "website",
    siteName: `${APP_NAME}`,
    locale: "en",
    images: [
      {
        url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `Privacy Policy | ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${APP_NAME}`,
    description: `Learn how ${APP_NAME} collects, uses, and protects your personal information.`,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">          
            <Heading
              title="Privacy Policy"
              description="Your privacy matters to us. Learn how we collect, use, and protect your personal information while providing you with the best scheduling experience."
              headingTag="h1"
              titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl drop-shadow-sm border border-neutral-100 p-4 sm:p-12">
            <PrivacyPolicyContent />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <CallToAction
        badge="Built for Modern Business"
        title="Ready for GetSetTime To Manage Your Appointments"
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
