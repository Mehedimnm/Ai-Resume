import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your MNM AI Resume account.",
};

export default function SignInPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-page flex min-h-[70vh] items-center py-16">
        <Suspense fallback={null}>
          <AuthForm mode="signin" />
        </Suspense>
      </div>
    </div>
  );
}
