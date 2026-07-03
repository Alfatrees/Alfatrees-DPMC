// NOT YET WIRED — pending Razorpay account/KYC. Do not reference Razorpay in user-facing copy until connected.
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

let scriptLoaded = false;

export function loadRazorpayScript(): Promise<void> {
  if (scriptLoaded && window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout."));
    document.head.appendChild(script);
  });
}

export async function initiateRazorpayPayment(opts: {
  fullName: string;
  email: string;
  phone?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onDismiss?: () => void;
}): Promise<void> {
  await loadRazorpayScript();

  const res = await fetch("/api/create-razorpay-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName: opts.fullName, email: opts.email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || "Failed to create order.");
  }

  const { orderId, amount, currency, keyId } = await res.json();

  const rzp = new window.Razorpay({
    key: keyId,
    amount,
    currency,
    name: "Alfatrees PMC",
    description: "Discovery Call - $50 (credited to first engagement)",
    order_id: orderId,
    prefill: {
      name: opts.fullName,
      email: opts.email,
      contact: opts.phone || "",
    },
    theme: { color: "#B8922E" },
    handler: opts.onSuccess,
    modal: { ondismiss: opts.onDismiss },
  });

  rzp.open();
}
