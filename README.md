# Alfatrees PMC — Website

Construction project management consultancy specializing in estimation, scheduling, project controls, and design management. Delivered globally in 24-72 hours.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** + **GSAP** (animations)
- **Three.js** + **React Three Fiber** (3D portfolio globe)
- **Resend** (transactional email)
- **Cal.com** (discovery call scheduling)
- **Razorpay** (payment processing)

## Getting Started

```bash
npm install
cp .env.example .env.local  # Fill in API keys
npm run dev                  # http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (8 sections) |
| `/services/[slug]` | 6 service detail pages |
| `/pricing` | 4-tier pricing with USD/INR toggle |
| `/about` | Principal credentials, standards |
| `/process` | 6-step engagement flow |
| `/get-started` | Instant quote calculator + discovery call |
| `/portfolio` | 3D globe project showcase |
| `/faq` | 25+ questions, accordion |
| `/terms` | Terms of engagement |
| `/privacy` | Privacy policy |

## Environment Variables

See `.env.example` for all required variables.

## Deployment

See `DEPLOYMENT.md` for complete deployment instructions including:
- Email setup (Hostinger)
- Resend domain verification
- Cal.com event configuration
- Razorpay API keys
- Vercel deployment
- DNS migration

## Documentation

- `CLAUDE.md` — Project conventions for AI assistants
- `DESIGN.md` — Design system (colors, typography, components)
- `DEPLOYMENT.md` — Step-by-step launch guide
