import Link from "next/link";
import Heading from "./Heading";
import ContactForm from "./ContactForm";
import { supportContent } from "@/lib/support-content";

export default function Support() {
  return (
    <section id="support" className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        <div className="absolute left-[-4rem] top-16 h-48 w-48 rounded-full bg-indigo-300/25 blur-3xl" />
        <div className="absolute right-[-2rem] bottom-10 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-7">
            <Heading
              badge={supportContent.badge}
              title={supportContent.title}
              description={supportContent.description}
              wrapperClassName="space-y-3"                                          
            />

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {supportContent.channels.map((channel) => (
                <li key={channel.id}>
                  <article className="flex h-full flex-col rounded-2xl border border-white bg-white p-4 shadow-sm shadow-slate-200/80">
                    <h3 className="text-sm font-semibold text-neutral-900">{channel.title}</h3>
                    <p className="mt-1 flex-1 text-sm leading-relaxed text-neutral-600">{channel.description}</p>
                    <Link
                      href={channel.href}
                      className="mt-3 inline-flex w-fit items-center text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {channel.actionLabel}
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white bg-white p-5 shadow-xl sm:p-6">
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">{supportContent.form.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{supportContent.form.description}</p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
