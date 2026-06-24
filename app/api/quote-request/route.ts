import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.QUOTE_NOTIFY_EMAIL || "info.alfatrees@gmail.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured.");
  return new Resend(key);
}

interface QuoteLineItemData {
  code: string;
  name: string;
  rangeLow: number;
  rangeHigh: number;
  tier: string;
}

interface QuoteData {
  referenceNumber: string;
  lineItems: QuoteLineItemData[];
  totalLow: number;
  totalHigh: number;
  input: {
    services: string[];
    projectValue: string;
    projectType: string;
    projectStage: string;
    urgency: string;
    sheets: string;
    trades: number;
    areaSqFt: number;
    location: string;
  };
}

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

function buildQuoteHtml(data: {
  type: "book" | "email";
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  driveLink?: string;
  quote: QuoteData;
}): string {
  const { type, fullName, email, phone, company, driveLink, quote } = data;

  const lineItemsHtml = quote.lineItems
    .map(
      (li, i) => `
    <tr style="background:${i % 2 === 0 ? "#faf7f2" : "#fff"};">
      <td style="padding:8px 12px;border:1px solid #e0d8cc;font-weight:bold;font-size:12px;color:#B8922E;">${li.code}</td>
      <td style="padding:8px 12px;border:1px solid #e0d8cc;font-size:13px;">${li.name}</td>
      <td style="padding:8px 12px;border:1px solid #e0d8cc;font-size:12px;color:#666;">${li.tier}</td>
      <td style="padding:8px 12px;border:1px solid #e0d8cc;font-weight:bold;text-align:right;white-space:nowrap;">${formatUSD(li.rangeLow)} – ${formatUSD(li.rangeHigh)}</td>
    </tr>`
    )
    .join("");

  return `
<div style="font-family:Inter,system-ui,sans-serif;max-width:700px;margin:0 auto;color:#1a1a1a;">
  <div style="background:#B8922E;padding:24px 32px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0;color:#fff;font-size:20px;">Alfatrees PMC — Service Quotation</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
      ${type === "book" ? "Booking Request" : "Indicative Estimate"} · Ref: ${quote.referenceNumber}
    </p>
  </div>

  <div style="border:1px solid #e0d8cc;border-top:none;padding:24px 32px;">
    <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#888;margin:0 0 12px;">Contact</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
      <tr><td style="padding:4px 0;width:120px;color:#888;font-size:13px;">Name</td><td style="padding:4px 0;font-size:13px;font-weight:600;">${fullName}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Email</td><td style="padding:4px 0;font-size:13px;"><a href="mailto:${email}" style="color:#B8922E;">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:4px 0;color:#888;font-size:13px;">Phone</td><td style="padding:4px 0;font-size:13px;">${phone}</td></tr>` : ""}
      ${company ? `<tr><td style="padding:4px 0;color:#888;font-size:13px;">Company</td><td style="padding:4px 0;font-size:13px;">${company}</td></tr>` : ""}
      ${driveLink ? `<tr><td style="padding:4px 0;color:#888;font-size:13px;">Documents</td><td style="padding:4px 0;font-size:13px;"><a href="${driveLink}" style="color:#B8922E;">${driveLink}</a></td></tr>` : ""}
    </table>

    <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#888;margin:0 0 12px;">Project Summary</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
      ${quote.input.location ? `<tr><td style="padding:4px 0;width:120px;color:#888;font-size:13px;">Location</td><td style="padding:4px 0;font-size:13px;">${quote.input.location}</td></tr>` : ""}
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Type</td><td style="padding:4px 0;font-size:13px;">${quote.input.projectType}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Stage</td><td style="padding:4px 0;font-size:13px;">${quote.input.projectStage}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Value</td><td style="padding:4px 0;font-size:13px;">${quote.input.projectValue}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Sheets</td><td style="padding:4px 0;font-size:13px;">${quote.input.sheets}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Trades</td><td style="padding:4px 0;font-size:13px;">${quote.input.trades}</td></tr>
      <tr><td style="padding:4px 0;color:#888;font-size:13px;">Urgency</td><td style="padding:4px 0;font-size:13px;">${quote.input.urgency}</td></tr>
    </table>

    <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#888;margin:0 0 12px;">Service Breakdown</h2>
    <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
      <thead>
        <tr style="background:#f0ebe2;">
          <th style="padding:8px 12px;border:1px solid #e0d8cc;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Code</th>
          <th style="padding:8px 12px;border:1px solid #e0d8cc;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Service</th>
          <th style="padding:8px 12px;border:1px solid #e0d8cc;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Tier</th>
          <th style="padding:8px 12px;border:1px solid #e0d8cc;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Range (±15%)</th>
        </tr>
      </thead>
      <tbody>${lineItemsHtml}</tbody>
    </table>

    <div style="background:#B8922E;color:#fff;padding:16px 20px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:14px;font-weight:600;">Total Estimated Range</div>
        <div style="font-size:11px;opacity:0.8;">±15% · ${quote.lineItems.length} service${quote.lineItems.length !== 1 ? "s" : ""}</div>
      </div>
      <div style="font-size:24px;font-weight:bold;">${formatUSD(quote.totalLow)} – ${formatUSD(quote.totalHigh)}</div>
    </div>

    <div style="margin-top:20px;padding:16px;background:#faf7f2;border-radius:8px;border:1px solid #e0d8cc;">
      <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 8px;">Terms & Conditions</h3>
      <ul style="margin:0;padding:0 0 0 16px;font-size:12px;color:#666;line-height:1.8;">
        <li>All prices in USD. <strong>Taxes not included.</strong></li>
        <li>This is an indicative estimate (±15%) based on project details provided.</li>
        <li>Final price confirmed after document review and scope verification.</li>
        <li>One revision round included in all fixed-price engagements.</li>
        <li>Payment: 100% advance under $500; 50% advance + 50% on delivery for $500+.</li>
        <li>Monthly retainer prices shown are per-month rates.</li>
        <li>Rates referenced from <a href="https://alfatrees.com/pricing" style="color:#B8922E;">alfatrees.com/pricing</a>.</li>
      </ul>
    </div>

    <div style="margin-top:20px;text-align:center;padding:16px;border-top:1px solid #e0d8cc;">
      <p style="font-size:12px;color:#888;margin:0;">
        Alfatrees PMC · Estimation · Scheduling · Project Controls · Design Management
      </p>
      <p style="font-size:11px;color:#aaa;margin:4px 0 0;">
        Generated from alfatrees.com · Ref: ${quote.referenceNumber}
      </p>
    </div>
  </div>
</div>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, fullName, email, phone, company, driveLink, quote } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const resend = getResend();

    // Discovery call request (no quote data)
    if (type === "discovery") {
      const services = body.services || [];
      const serviceList = (services as string[]).join(", ") || "Not specified";
      const discoveryHtml = `
<div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#B8922E;padding:20px 28px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0;color:#fff;font-size:18px;">Discovery Call Request — Alfatrees PMC</h1>
  </div>
  <div style="border:1px solid #e0d8cc;border-top:none;padding:20px 28px;">
    <table style="border-collapse:collapse;width:100%;">
      <tr><td style="padding:6px 0;width:130px;color:#888;font-size:13px;">Name</td><td style="padding:6px 0;font-size:13px;font-weight:600;">${fullName}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${email}" style="color:#B8922E;">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Phone</td><td style="padding:6px 0;font-size:13px;">${phone}</td></tr>` : ""}
      ${company ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Company</td><td style="padding:6px 0;font-size:13px;">${company}</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#888;font-size:13px;">Services</td><td style="padding:6px 0;font-size:13px;">${serviceList}</td></tr>
      ${body.projectLocation ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Location</td><td style="padding:6px 0;font-size:13px;">${body.projectLocation}</td></tr>` : ""}
      ${body.projectStage ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Stage</td><td style="padding:6px 0;font-size:13px;">${body.projectStage}</td></tr>` : ""}
      ${body.projectType ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Type</td><td style="padding:6px 0;font-size:13px;">${body.projectType}</td></tr>` : ""}
      ${body.projectValue ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Value</td><td style="padding:6px 0;font-size:13px;">${body.projectValue}</td></tr>` : ""}
      ${driveLink ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;">Documents</td><td style="padding:6px 0;font-size:13px;"><a href="${driveLink}" style="color:#B8922E;">${driveLink}</a></td></tr>` : ""}
    </table>
    ${body.projectDetails ? `<div style="margin-top:16px;padding:12px;background:#faf7f2;border-radius:6px;font-size:13px;"><strong>Project Details:</strong><br/>${body.projectDetails}</div>` : ""}
    <p style="margin-top:16px;font-size:12px;color:#888;">$50 discovery call (30 min) — client expects Cal.com booking confirmation.</p>
  </div>
</div>`;

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Alfatrees PMC <onboarding@resend.dev>",
        to: [TO_EMAIL],
        replyTo: email,
        subject: `Discovery Call Request: ${serviceList} — ${fullName}`,
        html: discoveryHtml,
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Alfatrees PMC <onboarding@resend.dev>",
        to: [email],
        subject: "Your Discovery Call Request — Alfatrees PMC",
        html: `<div style="font-family:Inter,system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#B8922E;">Discovery Call Request Received</h2>
          <p>Thank you, ${fullName}. We've received your discovery call request for: <strong>${serviceList}</strong>.</p>
          <p>We'll send you a Cal.com booking link shortly to schedule your 30-minute session ($50, credited to your first engagement).</p>
          <p style="color:#888;font-size:12px;margin-top:24px;">Alfatrees PMC · info.alfatrees@gmail.com</p>
        </div>`,
      });

      return NextResponse.json({ success: true });
    }

    // Quote-based submission (book or email)
    if (!quote?.lineItems?.length) {
      return NextResponse.json({ error: "Quote data is required." }, { status: 400 });
    }

    const htmlBody = buildQuoteHtml({ type, fullName, email, phone, company, driveLink, quote });
    const serviceList = quote.lineItems.map((li: QuoteLineItemData) => li.code).join(", ");
    const subjectPrefix = type === "book" ? "Booking Request" : "Quote Request";
    const subject = `${subjectPrefix}: ${serviceList} — ${fullName} [${quote.referenceNumber}]`;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "Alfatrees PMC <onboarding@resend.dev>";

    const { error: internalError } = await resend.emails.send({
      from: fromEmail,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (internalError) {
      console.error("Resend error (internal):", internalError);
      return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }

    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Your Alfatrees PMC Quote [${quote.referenceNumber}]`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote request error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
