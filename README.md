# Patrick Engelbert Personal Website

Personal portfolio and resume website for [patrickengelbert.com](https://www.patrickengelbert.com). The app is built with React, bundled with Vite, and deployed through Git-connected Cloudflare Pages.

## Features

- Home page with profile photo, responsive navigation, and interactive profile easter eggs
- Portfolio page with project writeups, links, screenshots, and interactive hidden details
- Contact page with EmailJS-powered contact forms
- Software Engineering resume page
- Robotics & Industrial Controls resume page with controls-focused interactive elements
- Trophy Room for discovered easter eggs, hints, progress tracking, blueprint mode, and social sharing
- Secret terminal with forgiving commands, hints, cheat behavior, and SpaceX mission-brief access
- SpaceX-focused hidden mission brief page
- Custom not-found experience with a recoverable signal easter egg
- Route-specific canonical, search, and social metadata generated into the
  initial production HTML, plus a sitemap and structured data

## Tech Stack

- React 18
- React Router 5
- Vite
- Vitest and Testing Library
- Cloudflare Pages and Cloudflare DNS
- AWS S3 for legacy portfolio images and the software resume PDF

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

Route 53 remains the registrar. AWS Amplify, CloudFront, and the original Route
53 hosted zone are temporarily retained as rollback resources. The complete
architecture, DNS snapshots, production verification, rollback instructions,
and Phase 3 cleanup criteria are documented in
[`docs/aws-cloudflare-migration.md`](docs/aws-cloudflare-migration.md).

## Changelog

Notable project changes are documented in [CHANGELOG.md](CHANGELOG.md).

## Security

Run `npm audit` before opening a PR when dependency changes are involved. This project was migrated away from Create React App because `react-scripts` pulled in outdated transitive packages with security advisories.

The latest dependency, CDN, EmailJS, secret-scan, and public-repository review is
documented in
[`docs/dependency-security-audit.md`](docs/dependency-security-audit.md).
