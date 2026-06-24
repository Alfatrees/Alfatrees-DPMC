# Alfatrees PMC — Deployment & Launch Guide

Complete step-by-step instructions to go from code to live at alfatrees.com.

---

## Pre-Launch Checklist

- [ ] Resend account + API key
- [ ] Cal.com account + "Discovery Call" event configured
- [ ] Razorpay account + API keys generated
- [ ] Vercel project created + Git repo connected
- [ ] Environment variables set in Vercel
- [ ] DNS migrated from Hostinger to Vercel
- [ ] End-to-end testing complete

**Contact email:** info.alfatrees@gmail.com (existing Gmail — no extra setup needed)

---

## Step 1: Resend — Email Delivery ($0/mo free tier)

1. Sign up at https://resend.com
2. Go to **API Keys** > **Create API Key**
   - Name: "alfatrees-production"
   - Permission: Sending access
3. Copy the API key (starts with `re_`)
4. **Initial setup:** Uses Resend's free `onboarding@resend.dev` sender — works immediately, no domain verification needed
5. **Optional later:** Add alfatrees.com domain in Resend for branded sender (Domains > Add Domain > add DNS records)
6. Free tier: 100 emails/day, 3,000/month — more than enough initially

---

## Step 2: Cal.com — Discovery Call Scheduling ($0, free plan)

### Sign Up
1. Sign up at https://cal.com
2. Username: `alfatrees`

### Create Event Type
1. Go to **Event Types** > **New Event Type**
2. Settings:
   - **Title:** "Discovery Call — $50"
   - **Duration:** 30 minutes
   - **Location:** Zoom (connect your Zoom account)
   - **Description:** "30-minute video call to discuss your project scope. $50 fee is fully credited toward your first engagement with Alfatrees PMC."

### Availability Schedule
1. Go to **Availability** > Edit default schedule
2. Available days: **Monday, Wednesday, Friday ONLY**
3. Available hours: **10:00 AM – 2:00 PM IST** (gives 4 x 30-min slots)
   - Slot 1: 10:00 AM IST
   - Slot 2: 10:30 AM or 11:00 AM IST
   - Slot 3: 11:30 AM or 12:00 PM IST
   - Slot 4: 12:30 PM or 1:00 PM IST
4. Set timezone to IST (Asia/Kolkata)
5. Max bookings per day: 4

### Payment Integration (Razorpay via Cal.com)
- Cal.com supports **Stripe** natively for payments
- For **Razorpay**: Use the standalone Razorpay integration (see Step 3)
- Alternative: Set Cal.com event to free booking, collect $50 via Razorpay separately

### Booking History
- Cal.com dashboard shows all bookings (past, current, upcoming)
- Clients see only available slots (no admin view)

### Update Environment Variable
- Set `NEXT_PUBLIC_CALCOM_USERNAME=alfatrees` in Vercel env vars
- The Cal.com embed on /get-started will use: `alfatrees/discovery-call`

---

## Step 3: Razorpay — Payment Processing ($0/mo + 2% per transaction)

1. Sign up at https://razorpay.com
2. Complete KYC verification (PAN, Aadhaar/business docs)
3. Go to **Settings** > **API Keys** > **Generate Key**
4. Copy:
   - **Key ID:** `rzp_live_xxxxxxxxxxxx`
   - **Key Secret:** `xxxxxxxxxxxxxxxxxxxxxxxx`
5. Store both securely — the secret is shown only once

### Razorpay + Cal.com Integration
Two approaches:

**Approach A: Razorpay collects $50 before booking (recommended)**
- Client fills in details on /get-started
- Client picks time slot on Cal.com embed
- Cal.com booking triggers → Razorpay checkout opens → $50 collected
- The code for this flow is already built in `/api/create-razorpay-order/route.ts`

**Approach B: Cal.com books free, Razorpay invoice sent separately**
- Client books via Cal.com (free)
- Alfatrees sends Razorpay payment link via email before the call
- Simpler but less automated

### Environment Variables
```
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
```

---

## Step 4: Vercel Deployment

### 4a. Push Code to GitHub
```bash
cd alfatrees-website
git init
git add -A
git commit -m "Initial commit: Alfatrees PMC website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alfatrees-website.git
git push -u origin main
```

### 4b. Connect to Vercel
1. Go to https://vercel.com
2. **Add New Project** > Import from GitHub > select `alfatrees-website`
3. Framework: Next.js (auto-detected)
4. Root Directory: `./` (default)
5. Build Command: `next build` (default)
6. Output Directory: `.next` (default)

### 4c. Set Environment Variables
In Vercel project **Settings** > **Environment Variables**, add:

| Variable | Value | Scope |
|----------|-------|-------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | Production |
| `QUOTE_NOTIFY_EMAIL` | `info.alfatrees@gmail.com` | Production |
| `RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` | Production |
| `RAZORPAY_KEY_SECRET` | `xxxxxxxxxxxxxxxxxxxxxxxx` | Production |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` | Production |
| `NEXT_PUBLIC_CALCOM_USERNAME` | `alfatrees` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://alfatrees.com` | Production |

Note: `RESEND_FROM_EMAIL` is optional — defaults to `onboarding@resend.dev`. Set to `Alfatrees PMC <noreply@alfatrees.com>` after verifying alfatrees.com domain in Resend.

### 4d. Deploy
- Click **Deploy** — Vercel builds and deploys automatically
- You'll get a preview URL like `alfatrees-website-xxx.vercel.app`
- Test everything on this URL before migrating DNS

---

## Step 5: DNS Migration — Hostinger to Vercel

### 5a. Add Domain in Vercel
1. In Vercel project > **Settings** > **Domains**
2. Add `alfatrees.com`
3. Add `www.alfatrees.com` (redirect to apex)
4. Vercel shows required DNS records

### 5b. Update DNS at Hostinger
1. Log into Hostinger > **Domains** > alfatrees.com > **DNS Zone**
2. Update/add these records:

| Type | Host | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

3. Remove any conflicting A or CNAME records for @ and www
4. Keep any existing MX/TXT records if needed

### 5c. Verify
- Wait for DNS propagation (5 min to 48 hours, usually < 30 min)
- Vercel auto-provisions SSL certificate
- Test: https://alfatrees.com should load your site
- Test: https://www.alfatrees.com should redirect to https://alfatrees.com

### 5d. Optional: Full Domain Transfer (Later)
- Transfer domain registrar from Hostinger to a dedicated registrar (Cloudflare, Namecheap)
- Not required — DNS pointing is sufficient for now

---

## Step 6: End-to-End Testing Checklist

### Pages (verify all load at alfatrees.com)
- [ ] / (landing page — all 8 sections render)
- [ ] /services/estimation (and all 5 other service pages)
- [ ] /pricing (USD/INR toggle works)
- [ ] /about (credentials, standards, principal)
- [ ] /process (6 steps, timelines, FAQ)
- [ ] /get-started (Path A: instant quote calculator + Path B: discovery call)
- [ ] /faq (25+ questions, accordion expand/collapse)
- [ ] /portfolio (3D globe on desktop, grid on mobile)
- [ ] /terms (11 sections)
- [ ] /privacy (privacy policy)
- [ ] /sitemap.xml (generates correctly)
- [ ] /robots.txt (allows all, disallows /api/)

### Quote Flow (Path A)
- [ ] Select 1+ services → fill project details → Calculate My Quote
- [ ] Quote breakdown displays correctly with line items
- [ ] "Book Now" → fill contact → submit → success message
- [ ] "Email My Quote" → fill contact → submit → email received at info.alfatrees@gmail.com
- [ ] "Book Discovery Call" → Cal.com modal opens
- [ ] Email received by client (quote format)

### Discovery Call Flow (Path B)
- [ ] Select services → fill contact + project details
- [ ] Cal.com embed loads and shows available slots (Mon/Wed/Fri)
- [ ] Can select a time slot and book
- [ ] "Send Project Details" button sends email to info.alfatrees@gmail.com
- [ ] $50 payment collected (via Razorpay or Cal.com payment)

### Theme & Responsive
- [ ] Light theme (default) — warm parchment background, gold accents
- [ ] Dark theme toggle works — persists on refresh
- [ ] Mobile responsive — all pages, navbar hamburger menu
- [ ] Portfolio: 3D globe on desktop, 2D grid fallback on mobile

### SEO
- [ ] Page titles show in browser tab (e.g., "Pricing | Alfatrees PMC")
- [ ] Open Graph tags present (inspect page source)
- [ ] JSON-LD structured data in page source
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Submit sitemap to Google Search Console

---

## Monthly Cost Summary

| Service | Cost |
|---------|------|
| Gmail (existing) | $0/mo |
| Vercel Free | $0/mo |
| Resend Free | $0/mo |
| Cal.com Free | $0/mo |
| Razorpay | $0/mo + 2%/txn |
| **Total** | **$0/mo** |

---

## Support

For any issues with the website code, reference the codebase at:
`C:\Users\arpra\claude-api-project\alfatrees-website\`

Key files:
- `.env.example` — All environment variables documented
- `app/api/quote-request/route.ts` — Email API (Resend)
- `app/api/create-razorpay-order/route.ts` — Payment API (Razorpay)
- `components/cal-embed.tsx` — Cal.com scheduling widget
- `components/portfolio/` — 3D globe portfolio components
- `lib/quote-engine.ts` — Pricing calculator engine
- `lib/razorpay.ts` — Razorpay client-side checkout
