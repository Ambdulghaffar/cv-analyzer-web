# CV Analyzer — Web

Next.js frontend for the **CV Analyzer AI** project: analyze, compare, and optimize CVs against job postings, with dedicated candidate and recruiter workspaces.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwindcss) ![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e?logo=supabase)

## Features

### Candidate Workspace
- Analyze a CV against a job posting: weighted match score, matched / missing skills, personalized recommendations
- History of all analyses performed
- Cover letter generation with choice of tone and language
- Export cover letters as PDF and Word
- Account settings management

### Recruiter Workspace
- Compare multiple CVs against a job posting, with automatic candidate ranking
- Manage saved job postings (create, edit, delete)
- History of comparisons performed
- Account settings management

## Tech Stack

| Domain | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Authentication | Supabase Auth (`@supabase/ssr`) |
| Forms & validation | react-hook-form + zod |
| Containerization | Docker |

## Architecture

Routing is organized into Next.js **Route Groups** to clearly separate the major page groups without affecting URLs:

- `(public)` — pages accessible to everyone (home, about)
- `(auth)` — authentication pages (login, register, forgot/reset password, role onboarding, OAuth callback)
- `dashboard` — protected candidate and recruiter workspaces, with a shared layout (shadcn sidebar, dynamic breadcrumb) and role-specific sub-routes

Supabase calls are split according to the execution context: a **browser** client for client components, and a **server** client (used notably in the middleware and Server Components/Route Handlers) that manages session cookies via `@supabase/ssr`.

## Authentication

Two sign-in methods are available:
- **Email / password**, with email confirmation
- **Google OAuth**

The user's role (candidate or recruiter) is determined either at the time of standard sign-up, or on first login via Google — in this second case, the user is redirected to an onboarding page (`/onboarding/role`) until a role has been chosen.

Routes under `/dashboard/*` are protected by a Next.js middleware: any unauthenticated request is redirected to `/login`.

## Prerequisites

- Node.js 22+
- A configured Supabase project (the same project used by the backend)
- The [cv-analyzer-api](#related-projects) backend running locally, or its deployment URL

## Local Installation

1. Clone the repository and move into the project folder:
   ```bash
   git clone <repository-url>
   cd cv-analyzer-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file at the root with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   NEXT_PUBLIC_API_URL=
   ```

   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: available in the project's Supabase Dashboard (the same project used by the backend), under **Project Settings > API Keys** — use the **"Publishable key"**.
   - `NEXT_PUBLIC_API_URL`: the URL of the `cv-analyzer-api` backend, locally (`http://localhost:8000` by default) or its deployment URL.

   > Google OAuth login additionally requires configuration on the Google Cloud Console side (Client ID/Secret) and on the Supabase Dashboard side (**Authentication > Providers > Google**). See the [official Supabase documentation](https://supabase.com/docs/guides/auth/social-login/auth-google) for the detailed steps.

4. Start the development server:
   ```bash
   npm run dev
   ```

The application is available at [http://localhost:3000](http://localhost:3000).

## Running with Docker

The provided `Dockerfile` relies on Next.js `standalone` mode to produce a lightweight production image.

```bash
docker build -t cv-analyzer-web .
docker run --env-file .env.local -p 3000:3000 cv-analyzer-web
```

## Design

The interface offers a light and dark theme, built around a consistent blue palette across the whole application. The authentication pages feature custom illustrations generated specifically for the project.

## Related Projects

- [cv-analyzer-api](#) — backend API consumed by this frontend (CV analysis, comparison, cover letter generation)
- [cv-analyzer-infra](#) — Docker Compose orchestration of all the project's services

## Author

**Ambdulghaffar Ahamadi**
- GitHub: [github.com/ambdulghaffar](https://github.com/ambdulghaffar)
- LinkedIn: [linkedin.com/in/ambdulghaffar-ahamadi](https://www.linkedin.com/in/ambdulghaffar-ahamadi-7a476839a/)
