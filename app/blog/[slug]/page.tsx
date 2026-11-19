import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APP_NAME, BASE_URL, contactInfo, LOGIN_URL } from "@/lib/config";
import { blogPosts, getBlogBySlug, getRelatedPosts, getPrevNextPosts, getPostCategories } from "@/lib/blog-data";
import { BlogSidebar } from "@/app/component/BlogSidebar";
import { FaqSection } from "@/app/component/FaqSection";
import { PostViews } from "@/app/component/PostViews";
import Heading from "@/app/component/Heading";
import CallToAction from "@/app/component/CallToAction";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.metaTitle} | Blog | ${APP_NAME}`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.metaTitle} | Blog | ${APP_NAME}`,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      siteName: `${APP_NAME}`,
      locale: "en",
      publishedTime: `${post.publishedAt}`,
      authors: [`${post.author.name}`],
      section: `${post.category}`,
      images: [
        {
          url: `${BASE_URL}/${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `${BASE_URL}`,
      creator: `${APP_NAME}`,
      title: `${post.metaTitle} | Blog | ${APP_NAME}`,
      description: post.metaDescription,
      images: `${BASE_URL}/${post.coverImage}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev: prevPost, next: nextPost } = getPrevNextPosts(slug);
  const faqItems = (post.faq ?? []).map((faq, i) => ({
    title: faq.question,
    content: faq.answer,
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${post.slug}/#BlogPosting`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${post.slug}/#BlogPage`
        },
        "title": `${post.title} | Blog | ${APP_NAME}`,
        "description": `${post.excerpt}`,
        "image": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/${post.coverImage}`,
          "width": 1200,
          "height": 630
        },
        "datePublished": `${post.publishedAt}`,
        "author": {
          "@type": "Person",
          "name": `${post.author.name}`,
          "jobTitle": `${post.author.role}`,
          "image": `${BASE_URL}/${post.author.avatar}`
        },
        "publisher": {
          "@type": "Organization",
          "name": `${APP_NAME}`,
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}${contactInfo.logo}`
          }
        },
        "articleSection": `${post.category}`,
        "keywords": `${post.keywords}`,
        "wordCount": `${post.content.split(/\s+/).length}`,
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${post.slug}/#BlogPage`,
        "url": `${BASE_URL}/blog/${post.slug}`,
        "name": `${post.title} | Blog | ${APP_NAME}`,
        "isPartOf": {
          "@id": `${BASE_URL}/blog/#WebPage`  
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/${post.coverImage}`
        },
        "datePublished": `${post.publishedAt}`,
        "dateModified": `${post.publishedAt}`,
        "description": `${post.excerpt}`
      },
      {
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
            "item": `${BASE_URL}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${BASE_URL}/blog/${post.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/blog/${post.slug}/#FAQPage`,
        "mainEntity": [
          ...faqItems.map((faq, i) => ({
            "@type": "Question",
            "name": `${faq.title}`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${faq.content}`
            }
          })),
        ]
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <Script id="blog-detail-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null,  2) }} />

      <section className="relative overflow-hidden pt-10">
        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">{post.title}</h1>
          {/* Author + meta */}
          <div className="mt-4 flex flex-wrap items-center border-y border-black/8 py-4 gap-x-5 gap-y-3 text-sm">
            <div className="flex items-center gap-1">
                <span><svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                <span className="text-neutral-700">{post.author.name}</span>              
            </div>

            <div className="flex items-center gap-2 text-neutral-500">
              <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {getPostCategories(post).map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`} className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                  <svg className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                  {category}
                </Link>
              ))}
            </div>

            <PostViews slug={post.slug} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 lg:py-16">
        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="min-w-0 lg:col-span-8">
              
              <div className="relative space-y-4">
                {/* Cover image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image src={`/${post.coverImage}`} alt={post.title} width={1000} height={500} priority={true} sizes="(max-width: 768px) 100vw, 50vw" className="h-auto w-full object-cover" />
                  </div>
                </div>

                <div className="blog-content space-y-4" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} aria-label="Previous Post - Blog" className="group flex items-center gap-4 p-5 bg-white rounded-2xl drop-shadow-md hover:drop-shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors duration-200">
                      <svg className="w-5 h-5 text-neutral-500 group-hover:text-indigo-600 transition-colors group-hover:-translate-x-0.5 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Previous</div>
                      <p className="font-semibold text-neutral-900 group-hover:text-indigo-600">{prevPost.title}</p>
                    </div>
                  </Link>
                ) : (
                  <Link href="/blog" aria-label="All Posts - Blog" className="group flex items-center gap-4 p-5 bg-white rounded-2xl drop-shadow-md hover:drop-shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors duration-200">
                      <svg className="w-5 h-5 text-neutral-500 group-hover:text-indigo-600 transition-colors group-hover:-translate-x-0.5 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Back to</div>
                      <p className="font-semibold text-neutral-900 group-hover:text-indigo-600">All Articles</p>
                    </div>
                  </Link>
                )}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} aria-label="Next Post - Blog" className="group flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-300 hover:-translate-y-1 text-white">
                    <div className="flex-1 text-right">
                      <div className="text-xs font-medium text-white/70 uppercase tracking-wider">Next</div>
                      <p className="font-semibold text-white">{nextPost.title}</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <Link href="/blog" aria-label="More Posts - Blog" className="group flex items-center gap-4 p-5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-300 hover:-translate-y-1 text-white">
                    <div className="flex-1 text-right">
                      <div className="text-xs font-medium text-white/70 uppercase tracking-wider">Explore</div>
                      <p className="font-semibold text-white">More Articles</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
              
              {faqItems.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
                  <FaqSection items={faqItems} />
                </div>
              )}
              
            </article>
            <div className="min-w-0 lg:col-span-4">
              <div className="lg:sticky lg:top-20">
                <BlogSidebar currentPostSlug={post.slug} relatedPosts={relatedPosts} />
              </div>
            </div>
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