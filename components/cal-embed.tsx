"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  calLink?: string;
  name?: string;
  email?: string;
}

export function CalEmbed({ calLink, name, email }: CalEmbedProps) {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME || "alfatrees";
  const eventSlug = calLink || `${username}/discovery-call`;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#B8922E",
            "cal-brand-emphasis": "#9A7A26",
          },
          dark: {
            "cal-brand": "#D4A853",
            "cal-brand-emphasis": "#B8922E",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <Cal
      calLink={eventSlug}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      config={{
        layout: "month_view",
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
      }}
    />
  );
}
