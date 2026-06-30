"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, BRAND } from "@/lib/constants";
import { FadeIn } from "@/components/ui/motion";

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <FadeIn>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo-32-final.png"
                  alt={BRAND.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-lg font-semibold text-heading">
                  {BRAND.name}
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {BRAND.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                Services
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                Company
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                Legal & Connect
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:info.alfatrees@gmail.com"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    info.alfatrees@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/prakashchand222/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 border-t border-border-default pt-8 text-center text-sm text-text-muted">
          &copy; 2026 {BRAND.copyright}
        </div>
      </div>
    </footer>
  );
}
