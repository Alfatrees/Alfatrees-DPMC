import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export function ServicesOverview() {
  return (
    <section id="services" className="section-padding bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center">
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
            What We Deliver
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Six specialized disciplines. Every major project type.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.code}
              href={service.href}
              className="group rounded-xl border border-border-default bg-bg-card p-6 transition-all duration-200 hover:border-border-bright hover:border-t-gold"
            >
              <span className="font-mono text-sm text-gold-text">
                {service.code}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {service.subtitle}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-text-muted">{service.count}</span>
                <span className="text-sm text-gold-text transition-transform group-hover:translate-x-1">
                  Learn more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-text-muted">
          Serving residential, commercial, hospitality, healthcare,
          institutional, industrial, data center, interior, and renovation
          projects worldwide.
        </p>
      </div>
    </section>
  );
}
