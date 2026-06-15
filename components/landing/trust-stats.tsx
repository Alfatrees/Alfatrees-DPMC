import { TRUST_STATS } from "@/lib/constants";

export function TrustStats() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
