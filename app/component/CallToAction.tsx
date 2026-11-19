import type { ReactNode } from "react";
import ContactForm from "./ContactForm";
import Heading from "./Heading";
import Button, { type ButtonTone } from "./ui/button/Button";

export type CallToActionProps = {
  badge?: string;
  title: ReactNode;
  description?: ReactNode;
  buttonLink: string;
  buttonText: ReactNode;
  buttonAriaLabel?: string;
  buttonSource?: string;
  buttonTone?: ButtonTone;
  highlights?: string[];
};

export default function CallToAction({
  badge,
  title,
  description,
  buttonLink,
  buttonText,
  buttonAriaLabel,
  buttonSource,
  buttonTone = "light",
  highlights = [],
}: CallToActionProps) {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-500/10 via-indigo-200/20 to-indigo-500/10 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-4 sm:p-10">
          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Heading
                badge={badge}
                title={title}
                description={description}
                titleClassName="text-2xl sm:text-3xl font-bold text-white md:text-4xl lg:text-[40px] capitalize"
                descriptionClassName="text-white"
              />

              <div>
                <Button
                  buttonLink={buttonLink}
                  buttonText={buttonText}
                  ariaLabel={buttonAriaLabel}
                  source={buttonSource}
                  tone={buttonTone}
                />
              </div>

              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-3 text-white">
                  {highlights.map((item) => (
                    <span key={item} className="flex items-center gap-2 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mx-auto hidden w-full lg:block">
              <div className="rounded-xl bg-white/14 backdrop-blur-xl sm:p-4">
                <div className="rounded-xl bg-white p-3 drop-shadow-xl sm:p-4">
                  <h3 className="mt-2 text-xl font-semibold text-neutral-900">Send a message</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">This form emails the GetSetTime support inbox.</p>
                  <div className="mt-5">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
