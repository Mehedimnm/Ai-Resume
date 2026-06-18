import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free MNM AI Resume account.",
};

export default function SignUpPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-page flex min-h-[70vh] items-center py-16">
        <Suspense fallback={null}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </div>
  );
}
