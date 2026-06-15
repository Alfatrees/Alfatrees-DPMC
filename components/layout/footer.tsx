import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-32-final.png"
                alt="Alfatrees"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-semibold text-white">
                Alfatrees
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Estimation &middot; Scheduling &middot; Controls &middot; Design
              Management &middot; Evaluation
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
                  href="mailto:hello@alfatrees.com"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  hello@alfatrees.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/alfatrees"
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

        <div className="mt-16 border-t border-border-default pt-8 text-center text-sm text-text-muted">
          &copy; 2026 Alfatrees Preconstruction &amp; Project Controls
        </div>
      </div>
    </footer>
  );
}
