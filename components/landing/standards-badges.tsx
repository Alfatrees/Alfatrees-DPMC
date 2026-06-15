import { STANDARDS_INTERNATIONAL } from "@/lib/constants";

export function StandardsBadges() {
  return (
    <section className="section-padding bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <h3 className="text-lg font-medium text-text-muted">
          Aligned With Industry Standards
        </h3>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {STANDARDS_INTERNATIONAL.map((standard) => (
            <span
              key={standard}
              className="rounded-lg border border-border-default px-4 py-2 text-sm text-text-muted"
            >
              {standard}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
