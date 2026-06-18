import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MNM AI Resume collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: January 2025</p>

      <div className="prose-legal mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Overview</h2>
          <p className="mt-2 text-sm leading-relaxed">
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) is committed to
            protecting your privacy. This policy explains what information we
            collect, how we use it, and the choices you have. By using our
            service, you agree to the practices described here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Information we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li>Information you provide to build resumes and cover letters (name, contact details, work history, skills).</li>
            <li>Account information such as your email address, if you create an account.</li>
            <li>Usage data such as pages visited and features used, collected to improve the product.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. How we use your information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
            <li>To generate your resume and cover letter content.</li>
            <li>To provide, maintain, and improve our services.</li>
            <li>To communicate with you about your account or support requests.</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Data security</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Your data is processed and stored on secure AWS cloud infrastructure
            with industry-standard encryption in transit and at rest. We limit
            access to authorized personnel only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. AI processing</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Content you submit may be processed by AI models to generate resume
            and cover letter text. We only send the information necessary to
            perform this task and do not use your personal documents to train
            public models without your consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Your rights</h2>
          <p className="mt-2 text-sm leading-relaxed">
            You may request access to, correction of, or deletion of your personal
            data at any time by contacting us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Contact</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
