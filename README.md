# MNM AI Resume

AI-powered resume and cover letter builder. Built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**, designed to run on **AWS** cloud infrastructure.

> Built as a production-ready startup site, including everything reviewers
> (such as the AWS Activate program) look for: a clear product, a working
> demo, pricing, an about/team page, contact details, and legal pages.

## Features

- ✨ **AI Resume Builder** — turn rough notes into ATS-friendly, achievement-focused content
- 📝 **AI Cover Letter Generator** — tailored letters for any role and company
- 📄 **PDF export** — print-ready output via the browser print dialog
- 🎨 Modern, responsive landing page (hero, features, how-it-works, testimonials, FAQ)
- 💳 Pricing page with a clear business model (Free / Pro / Teams)
- 🔒 Privacy Policy & Terms of Service
- 🔍 SEO ready — metadata, JSON-LD structured data, sitemap, robots

## Tech stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 14 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS                            |
| AI           | Built-in generator + optional LLM       |
| Hosting      | AWS (Amplify / EC2 / Elastic Beanstalk) |
| AI Models    | OpenAI-compatible or Amazon Bedrock     |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app is **fully functional with no API key** thanks to a built-in smart
generator. To enable real LLM generation, copy `.env.example` to `.env.local`
and configure a provider.

## Project structure

```
app/
  api/
    generate-resume/route.ts        # Resume generation endpoint
    generate-cover-letter/route.ts  # Cover letter generation endpoint
  builder/page.tsx                  # AI resume builder
  cover-letter/page.tsx             # AI cover letter generator
  pricing/  about/  contact/        # Marketing & company pages
  privacy/  terms/                  # Legal pages
  page.tsx                          # Landing page
components/                         # UI components & sections
lib/
  generator.ts                      # Deterministic content generator
  llm.ts                            # Optional LLM integration
  types.ts  site.ts                 # Types & site config
```

## Deploying on AWS

This app is a standard Next.js application and deploys cleanly to:

- **AWS Amplify Hosting** (recommended — connect the repo and it builds automatically)
- **AWS Elastic Beanstalk** or **EC2** with `npm run build && npm run start`
- **AWS Bedrock** for AI generation via the `lib/llm.ts` integration point

## License

© MNM AI Resume. All rights reserved.
