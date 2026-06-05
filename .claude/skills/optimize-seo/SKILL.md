---
name: optimize-seo
description: >
  Audit and implement SEO optimizations for Next.js and React projects. Use this skill
  whenever the user mentions SEO, search rankings, Lighthouse scores, Core Web Vitals,
  meta tags, structured data, sitemaps, slow LCP or CLS issues, or wants their Next.js/React
  app to rank better on Google. Also trigger when the user says things like "my site doesn't
  show up on Google", "help me with performance", "improve my page speed", or asks about
  metadata, Open Graph tags, robots.txt, or schema markup in a web project context.
  This skill covers the full audit → prioritize → implement → verify loop.
---

# optimize-seo

You are an SEO and performance engineer auditing and improving a Next.js or React project.
Your job is to run a structured audit, surface the highest-impact issues, and implement the
fixes — not just produce a report.

---

## Phase 1: Detect the stack

Before auditing, understand what you're working with:

- Is this **Next.js App Router**, **Next.js Pages Router**, or a plain **React SPA**?
- Is it TypeScript or JavaScript?
- What version of Next.js? (Check `package.json`)
- Does it use any SEO libraries already? (`next-seo`, `react-helmet`, `react-helmet-async`)

This determines which APIs and patterns apply. App Router uses `generateMetadata` and file
conventions (`sitemap.ts`, `robots.ts`). Pages Router uses `next/head`. Plain React SPAs
need `react-helmet-async` or SSR to fix fundamental crawlability.

---

## Phase 2: Audit — what to check

Work through these in order. The ones at the top have the highest impact on rankings.

### 2.1 Metadata coverage

Check every route/page:
- Does it export a unique `<title>`? (Pages Router: `<Head><title>`, App Router: `metadata.title`)
- Does it have a `<meta name="description">`? Aim for 120–160 characters.
- Is there a canonical URL set? Missing canonicals cause duplicate content penalties.
- Are Open Graph tags present? (`og:title`, `og:description`, `og:image`, `og:url`)
- Is there a `twitter:card` tag?

**Common problem pattern:** A shared layout sets one title/description for the whole site,
and individual pages never override it. Every page must produce its own unique metadata.

### 2.2 Rendering strategy

- Are content pages (blog posts, product pages, landing pages) **SSG or SSR**, not CSR?
- A CSR-only page means Googlebot may receive an empty HTML shell. This is the single
  biggest SEO killer in React apps.
- If App Router: check that content pages are Server Components or use `generateStaticParams`.
- If Pages Router: check for `getStaticProps` / `getServerSideProps` on content pages.

### 2.3 Core Web Vitals — LCP

The LCP target is < 2.5s. Look for:
- Hero images or above-the-fold images missing `priority` prop on `<Image>` (Next.js) or
  `fetchpriority="high"` attribute (plain React).
- Multiple images marked `priority={true}` — only the LCP candidate should be prioritized.
- Fonts not preloaded or missing `font-display: swap`.
- Large images not sized/converted to WebP or AVIF.
- TTFB over 800ms — suggests pages that could be SSG but are being SSR'd on every request.

### 2.4 Core Web Vitals — CLS

The CLS target is < 0.1. Look for:
- `<img>` tags missing `width` and `height` attributes (causes layout shift as images load).
- `<Image>` from `next/image` missing explicit dimensions (or using `fill` without a sized container).
- Fonts causing FOUT (Flash of Unstyled Text) — fix with `next/font` or explicit `font-display`.
- Dynamic content injected above existing content (ads, banners, cookie notices) without
  reserved space.

### 2.5 Core Web Vitals — INP

The INP target is < 200ms. Look for:
- Large event handlers running synchronous, heavy logic (sorting, filtering large arrays) on
  user interaction. These should be deferred with `startTransition` or moved to a Web Worker.
- Unnecessary full-page re-renders on interaction.
- Third-party scripts (analytics, chat widgets) blocking the main thread — move them to
  `next/script` with `strategy="lazyOnload"` or `"afterInteractive"`.

### 2.6 Structured data (JSON-LD)

Structured data gives Google rich results (star ratings, FAQs, breadcrumbs, article bylines).
Check for:
- No JSON-LD anywhere on the site.
- JSON-LD only on the homepage but not on article/product/blog pages.
- Missing schema types that match the content (Article, Product, BreadcrumbList, FAQPage,
  Organization, WebSite).

### 2.7 Sitemap and robots.txt

- Does `sitemap.xml` exist and include all indexable URLs?
- Does `robots.txt` exist, allow Googlebot, and reference the sitemap?
- Are there accidental `noindex` directives on pages that should be indexed?

### 2.8 Content SEO signals

- Do pages have a single `<h1>` that matches or is closely related to the page's target topic?
- Are heading levels sequential (h1 → h2 → h3) without skipping?
- Do all `<img>` and `<Image>` elements have descriptive `alt` text (not empty, not "image")?
- Are internal links using descriptive anchor text (not "click here")?

---

## Phase 3: Prioritize

After auditing, rank findings by impact. Use this rough priority order:

1. **Blocking**: CSR-only content pages (fix rendering strategy first)
2. **High**: Missing or duplicate title/description on key pages
3. **High**: LCP image not prioritized / hero image lazy-loaded
4. **High**: Images missing dimensions (CLS)
5. **Medium**: No JSON-LD structured data
6. **Medium**: Missing sitemap or robots.txt
7. **Medium**: Third-party scripts blocking main thread
8. **Lower**: Open Graph / Twitter card tags
9. **Lower**: Heading hierarchy issues

Tell the user what you found and your proposed order of fixes before implementing. Get
a quick confirmation if priorities seem surprising (e.g., if there are 20 pages with missing
metadata, ask if they want all of them fixed or just key pages first).

---

## Phase 4: Implement

Implement the fixes in the project files. Concrete patterns:

### Metadata — App Router
```ts
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://example.com/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      images: [{ url: post.ogImage }],
    },
  }
}
```

### Metadata — Pages Router
```tsx
import Head from 'next/head'
// In your page component:
<Head>
  <title>{post.title} | Site Name</title>
  <meta name="description" content={post.excerpt} />
  <link rel="canonical" href={`https://example.com/blog/${post.slug}`} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
</Head>
```

### Sitemap — App Router
```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...posts.map(p => ({
      url: `https://example.com/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    }))
  ]
}
```

### Robots — App Router
```ts
// app/robots.ts
import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

### LCP image fix (Next.js)
```tsx
// Add priority to the hero/above-the-fold image only
<Image src={hero} alt="..." width={1200} height={630} priority />
// All other images: no priority prop (they lazy-load by default, which is correct)
```

### JSON-LD structured data
```tsx
// components/JsonLd.tsx
export function ArticleJsonLd({ post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Third-party scripts (Next.js)
```tsx
import Script from 'next/script'
// Use afterInteractive for analytics (fires after hydration)
<Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />
// Use lazyOnload for chat widgets, non-critical tracking
<Script src="https://chat.example.com/widget.js" strategy="lazyOnload" />
```

### Font optimization (Next.js)
```ts
// app/layout.tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
// Apply: <body className={inter.className}>
```

---

## Phase 5: Verify

After implementing, check your work:

- Run `next build` — confirm no TypeScript/build errors.
- For metadata: check the `<head>` output by running `next start` and inspecting the
  page source (not the DevTools Elements panel, which shows post-hydration state).
- For structured data: paste a URL or HTML into
  [Google's Rich Results Test](https://search.google.com/test/rich-results) or the
  [Schema Markup Validator](https://validator.schema.org/).
- For Core Web Vitals: run Lighthouse in Chrome DevTools (mobile, incognito) and check
  LCP, CLS, and INP scores. LCP < 2.5s, CLS < 0.1, INP < 200ms are the "good" thresholds.
- Tell the user what improved and what still needs attention (e.g., some issues like TTFB
  require infrastructure changes you can't make from the codebase).

---

## Notes on plain React SPAs (non-Next.js)

If the project is a plain React SPA with no SSR, the most impactful fix is migrating to
Next.js or adding SSR — but that's a large change. Short of that:

- Use `react-helmet-async` for meta tags (not the deprecated `react-helmet`).
- Add a prerender service or static prerendering for key pages if migration isn't feasible.
- Be honest with the user: without SSR, Googlebot will receive an empty `<div id="root">`,
  and most metadata optimizations have limited effect.
