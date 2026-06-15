"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "alfatrees-service-request";

export const SERVICE_CATEGORIES = [
  "Estimation",
  "Scheduling",
  "Project Controls",
  "Design Management",
  "Evaluation & Review",
  "Quality Planning",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

type ServiceRequestContextType = {
  selected: ServiceCategory[];
  toggle: (cat: ServiceCategory) => void;
  isSelected: (cat: ServiceCategory) => boolean;
  clear: () => void;
  count: number;
};

const ServiceRequestContext = createContext<ServiceRequestContextType>({
  selected: [],
  toggle: () => {},
  isSelected: () => false,
  clear: () => {},
  count: 0,
});

export function useServiceRequest() {
  return useContext(ServiceRequestContext);
}

export function ServiceRequestProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ServiceCategory[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ServiceCategory[];
        setSelected(parsed.filter((c) => SERVICE_CATEGORIES.includes(c)));
      }
    } catch {
      // ignore corrupt storage
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    }
  }, [selected, mounted]);

  const toggle = useCallback((cat: ServiceCategory) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const isSelected = useCallback(
    (cat: ServiceCategory) => selected.includes(cat),
    [selected]
  );

  const clear = useCallback(() => setSelected([]), []);

  return (
    <ServiceRequestContext.Provider
      value={{
        selected: mounted ? selected : [],
        toggle,
        isSelected,
        clear,
        count: mounted ? selected.length : 0,
      }}
    >
      {children}
    </ServiceRequestContext.Provider>
  );
}
