"use client";

interface ViewToggleProps {
  view: "globe" | "table";
  onChange: (v: "globe" | "table") => void;
  globeAvailable: boolean;
}

export function ViewToggle({ view, onChange, globeAvailable }: ViewToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio view"
      className="flex items-center gap-0.5 rounded-full border border-white/15 bg-black/50 p-0.5 backdrop-blur-md"
    >
      {(["globe", "table"] as const).map((v) => (
        <button
          key={v}
          role="tab"
          aria-selected={view === v}
          disabled={v === "globe" && !globeAvailable}
          onClick={() => onChange(v)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 ${
            view === v ? "bg-[#D4A853] text-black" : "text-gray-300 hover:text-white"
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {v === "globe" ? "Globe" : "Table"}
        </button>
      ))}
    </div>
  );
}
