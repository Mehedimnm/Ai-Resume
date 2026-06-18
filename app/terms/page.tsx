import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of MNM AI Resume.",
};

export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of terms</h2>
          <p className="mt-2 text-sm leading-relaxed">
            By accessing or using {siteConfig.name}, you agree to be bound by these
            Terms of Service. If you do not agree, please do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Use of the service</h2>
          <p className="mt-2 text-sm leading-relaxed">
            You may use {siteConfig.name} to create resumes, cover letters, and
            related career documents for lawful purposes only. You are responsible
            for the accuracy of the information you provide and for reviewing all
            generated content before use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. AI-generated content</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Our service uses AI to generate suggestions. While we strive for
            quality, generated content may contain errors or inaccuracies. You are
            responsible for verifying and editing content before submitting it to
            employers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Accounts &amp; payment</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Some features require a paid subscription. Fees are billed in advance
            and are non-refundable except as required by law. You may cancel at any
            time, and cancellation takes effect at the end of the billing period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Intellectual property</h2>
          <p className="mt-2 text-sm leading-relaxed">
            You retain ownership of the content you create. We retain ownership of
            the platform, software, and templates. You may not copy, resell, or
            redistribute the service without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Limitation of liability</h2>
          <p className="mt-2 text-sm leading-relaxed">
            {siteConfig.name} is provided &quot;as is&quot; without warranties of
            any kind. We are not liable for any indirect or consequential damages
            arising from your use of the service, including hiring outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Changes to these terms</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We may update these terms from time to time. Continued use of the
            service after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">8. Contact</h2>
          <p className="mt-2 text-sm leading-relaxed">
            For questions about these terms, contact{" "}
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
