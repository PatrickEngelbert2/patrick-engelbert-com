# Patrick Engelbert Personal Website

Personal portfolio and resume website for [patrickengelbert.com](https://www.patrickengelbert.com). The app is built with React, bundled with Vite, and deployed through Git-connected Cloudflare Pages.

## Features

- Home page with profile photo, responsive navigation, and interactive profile easter eggs
- Portfolio page with project writeups, links, screenshots, and interactive hidden details
- Contact page with EmailJS-powered contact forms
- Software Engineering resume page
- Robotics, Automation & Industrial Controls resume with current MP Materials
  engineering internship experience, an in-progress capstone, four automation
  projects, PDF viewing/downloading, and the commissioning easter egg
- Trophy Room for discovered easter eggs, hints, progress tracking, blueprint mode, and social sharing
- Secret terminal with forgiving commands, hints, cheat behavior, and SpaceX mission-brief access
- SpaceX-focused hidden mission brief page
- Custom not-found experience with a recoverable signal easter egg
- Route-specific canonical, search, and social metadata generated into the
  initial production HTML, plus a sitemap and structured data
- Optimized responsive WebP images, route-level loading for secondary pages,
  reduced-motion support, skip navigation, and accessible form status feedback

## Tech Stack

- React 18
- React Router 5
- Vite
- Vitest and Testing Library
- Cloudflare Pages and Cloudflare DNS
- AWS S3 for legacy portfolio images and the software resume PDF

## Resume Documents

The robotics web resume at `/resume/robotics-controls` reflects the October 2026
resume. Both **View PDF** and **Download PDF** use
`/resumes/Patrick_Engelbert_Automation_Controls_Resume_2026-10_b84c91dbf624.pdf`.
This is the supplied two-page document, copied unchanged into `public/resumes/`
and included in the Pages build. Its content-specific filename prevents a cached
older resume from being served through the new actions.

The existing `/Patrick_Engelbert_Robotics_Controls_Resume.pdf` URL remains available
with the same updated document and a revalidation cache policy. A browser with a
previously cached copy of that legacy URL may retain it until its old cache
lifetime expires; use the versioned URL for the October update. For later updates,
commit the exact source PDF under a new version/content-specific filename,
replace the compatibility copy, and update both page actions and their regression
test. The Software Engineering PDF remains at its existing S3 URL.

## Requirements

- Node.js 20.19 or newer
- npm

The `.nvmrc` file targets Node 22 for local development and Amplify builds.

## Getting Started

From this project folder:

```bash
npm install
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm start
```

Starts the Vite development server.

```bash
npm test
```

Runs the Vitest test suite once.

```bash
npm run build
```

Creates a production build in the `build/` folder.

The build also generates route-specific HTML metadata and validates the SEO
output.

```bash
npm run validate:seo
```

Validates metadata, crawler files, and social-preview assets in an existing
production build.

```bash
npm run preview
```

Serves the production build locally for a final check.

## Project Structure

- `src/` contains the React app.
- `src/Layout/` contains shared layout pieces such as the header, footer, routes, and page shell.
- `src/components/` contains page-level components and resume content.
- `src/constants/` contains shared site constants such as contact and social links.
- `src/easterEggs/` contains the easter egg state, terminal, Trophy Room, and hidden interactions.
- `src/seo/` contains the shared route metadata and in-app metadata synchronization.
- `src/images/` contains imported image and SVG assets.
- `public/` contains static files copied directly into the production build.
- `scripts/` contains build-time route generation, SEO validation, and brand-asset tooling.
- `amplify/` contains AWS Amplify project metadata.

## Deployment

Cloudflare Pages builds and deploys the production site automatically from the
`main` branch. The build command is `npm run build`, the output directory is
`build/`, and no deployment environment variables are required.

- Production: [www.patrickengelbert.com](https://www.patrickengelbert.com)
- Pages fallback: [patrick-engelbert-com.pages.dev](https://patrick-engelbert-com.pages.dev)
- Canonical behavior: the apex domain redirects permanently to `www` while
  preserving paths and query strings

Route 53 remains the registrar, while Cloudflare provides authoritative DNS and
Pages hosting. The former AWS Amplify app, its managed backend resources and
CloudFront distribution, and the non-authoritative Route 53 hosted zone were
retired after the migration monitoring period. The independent
`images-patrickengelbert` S3 bucket remains a production dependency. The
complete architecture, DNS snapshots, production verification, and Phase 3
retirement record are documented in
[`docs/aws-cloudflare-migration.md`](docs/aws-cloudflare-migration.md).

## Changelog

Notable project changes are documented in [CHANGELOG.md](CHANGELOG.md).

## Security

Run `npm audit` before opening a PR when dependency changes are involved. This project was migrated away from Create React App because `react-scripts` pulled in outdated transitive packages with security advisories.

The latest dependency, CDN, EmailJS, secret-scan, and public-repository review is
documented in
[`docs/dependency-security-audit.md`](docs/dependency-security-audit.md).

The latest measured mobile/desktop performance and accessibility review is
documented in
[`docs/performance-accessibility-audit.md`](docs/performance-accessibility-audit.md).
