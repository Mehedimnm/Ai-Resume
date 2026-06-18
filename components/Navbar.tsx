"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { nav } from "@/lib/site";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="h-9 w-32 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <>
              <span className="text-sm font-medium text-slate-600">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Link href="/builder" className="btn-primary">
                Build resume
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-accent-600"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
              >
                Sign in
              </Link>
              <Link href="/signup" className="btn-primary">
                Get started free
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/builder"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Build my resume
            </Link>
            {!loading && user ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="mt-1 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Log out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <div className="mt-1 flex gap-2">
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
