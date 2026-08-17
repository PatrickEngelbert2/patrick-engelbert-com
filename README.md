# Patrick Engelbert Personal Website

Personal portfolio and resume website for [patrickengelbert.com](https://www.patrickengelbert.com). The app is built with React, bundled with Vite, and deployed with AWS Amplify.

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

## Tech Stack

- React 18
- React Router 5
- Vite
- Vitest and Testing Library
- AWS Amplify hosting

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
- `src/images/` contains imported image and SVG assets.
- `public/` contains static files copied directly into the production build.
- `amplify/` contains AWS Amplify project metadata.

## Deployment

Production currently remains on AWS Amplify, which builds and deploys the site
from the `main` branch. The build command is `npm run build`, and the production
output folder is `build/`.

A migration to Git-connected Cloudflare Pages is being prepared without
changing production DNS. The audited architecture, DNS snapshot, build settings,
verification checklist, and zero-downtime cutover plan are documented in
[`docs/aws-cloudflare-migration.md`](docs/aws-cloudflare-migration.md).

The verified Phase 1 deployment is available at
[patrick-engelbert-com.pages.dev](https://patrick-engelbert-com.pages.dev).
This temporary hostname is not yet connected to the production domain.

## Changelog

Notable project changes are documented in [CHANGELOG.md](CHANGELOG.md).

## Security

Run `npm audit` before opening a PR when dependency changes are involved. This project was migrated away from Create React App because `react-scripts` pulled in outdated transitive packages with security advisories.
