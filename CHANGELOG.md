# Changelog

All notable changes to this project are documented in this file.

This project does not currently have formal GitHub Releases. Historical entries
below are reconstructed from merged pull requests, branch names, and commit
messages in the repository history.

The format follows the spirit of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
with plain-language notes focused on user-facing behavior, maintainability, and
deployment impact.

## [Unreleased]

### Added

- Added a measured mobile and desktop performance/accessibility audit with
  before-and-after Lighthouse, network, bundle, keyboard, and regression data.
- Added a keyboard-visible skip link, consistent focus indicators, accessible
  inline form status messages, and EmailJS submission tests.
- Added responsive 640 px and 1200/1280 px WebP portfolio image candidates and
  a home-only preload for the profile LCP image.
- Added Cloudflare Pages cache headers for immutable fingerprinted assets, PDFs,
  and the social preview.
- Added a Phase 3 migration completion record covering final Cloudflare DNS,
  retired AWS hosting resources, retained resources, billing, and production
  verification.
- Enabled Cloudflare DNSSEC after the migration monitoring period and registered
  its KSK with Route 53 Registrar to establish a public chain of trust.
- Added route-specific build-time metadata for public, utility, thin-content,
  and hidden routes so titles, descriptions, canonicals, crawler directives,
  Open Graph tags, and Twitter/X cards exist before React executes.
- Added a production sitemap, crawler policy, conservative homepage Person and
  WebSite structured data, a branded social-preview image, and automated SEO
  output validation.
- Added branded manifest and Apple touch icons derived from the site's existing
  favicon.
- Added a machine-readable Cloudflare DNS snapshot covering authoritative
  nameservers, production records, redirect rules, Pages custom-domain status,
  and retained AWS validation data.
- Added exact Pages-only and DNS-provider rollback procedures for restoring the
  retained Amplify and Route 53 configuration.
- Added a production hosting audit covering Amplify, its empty Gen 1 backend,
  Route 53, CloudFront, S3 dependencies, build settings, and current AWS costs.
- Added a machine-readable snapshot of all Route 53 records and a documented
  zero-downtime procedure for a later Cloudflare DNS cutover.
- Added Cloudflare Pages migration documentation with the Git-connected build
  contract, temporary-preview verification checklist, rollback guidance, and
  AWS decommissioning guardrails.
- Added a Git-connected Cloudflare Pages project and verified temporary
  `pages.dev` deployment while leaving the production domain on AWS.
- Added this changelog to document the portfolio site's evolution in a
  professional, release-oriented format.
- Added centralized contact and social-link constants so the site uses one
  canonical source for email, phone, location, portfolio URL, LinkedIn, and
  GitHub profile links.
- Added mission-focused easter eggs, including secrets tied to blueprint mode,
  resume cross-visits, terminal commands, SpaceX page navigation, and the 404
  experience.
- Added additional portfolio easter eggs and discovery improvements, including
  trophy-room grouping, hidden descriptions, per-page discovery counts, and hint
  controls for undiscovered secrets.

### Changed

- Re-encoded the fixed background and profile photo as optimized WebP assets,
  reducing their combined production weight from about 1.9 MB to about 100 kB.
- Replaced eager S3 portfolio screenshots with optimized responsive local
  assets and lazy loading while retaining the existing project presentation.
- Deferred secondary routes, including EmailJS forms and the SpaceX/404 pages,
  while keeping primary routes synchronous to avoid layout shift.
- Replaced Bootstrap Icons with lightweight existing/CSS assets, reducing the
  main CSS bundle from 123.51 kB to 38.81 kB and removing the icon font.
- Improved resume and Portfolio contrast without changing the established
  palette, and added a global reduced-motion guard for significant animations.
- Updated four vulnerable transitive development dependencies to compatible
  patched releases without changing direct dependency ranges.
- Replaced the mobile navbar's Bootstrap JavaScript collapse behavior with
  equivalent React state, allowing the site to stop loading jQuery, Popper,
  Bootstrap JavaScript, and the unused Open Iconic stylesheet.
- Expanded environment-file ignore rules to reduce the risk of accidentally
  committing local secrets.
- Updated the web app manifest and canonical portfolio URL to use the live
  `www.patrickengelbert.com` identity consistently.
- Added client-side metadata synchronization for in-app route changes while
  retaining build-time metadata as the crawler-facing source of truth.
- Migrated authoritative DNS from Route 53 to Cloudflare while keeping Route 53
  as the registrar and preserving the original hosted zone for rollback.
- Moved `www.patrickengelbert.com` production hosting from AWS Amplify and
  CloudFront to the Git-connected `patrick-engelbert-com` Pages project.
- Replaced the AWS apex redirect with explicit Cloudflare HTTP and HTTPS `301`
  rules that preserve paths and query strings.
- Updated the README and migration runbook to describe the live Cloudflare
  architecture, retained AWS dependencies, monitoring period, and Phase 3
  eligibility.
- Updated contact and social links across the header, footer, resumes, contact
  form, and Trophy Room to use the centralized constants.
- Updated the generated contact-info email to send Patrick's real contact
  details instead of hidden placeholder values.
- Improved EmailJS form UX by disabling submit buttons while messages are being
  sent and using more professional success and failure messages.
- Replaced the unfinished Experience page placeholder text with a concise note
  that directs visitors to the software resume, robotics and controls resume,
  and portfolio.
- Updated the README feature list and project structure notes so they reflect
  the implemented easter egg system, Trophy Room, SpaceX mission brief, and
  shared constants.
- Updated social sharing text to derive the site host from the centralized
  portfolio URL.
- Replaced the apex CloudFront target with Cloudflare's proxied `192.0.2.1`
  redirect-only placeholder while preserving the canonical `301` rules.
- Updated deployment documentation to describe the final Cloudflare Pages and
  Cloudflare DNS architecture after the AWS rollback window closed.

### Removed

- Removed the obsolete Amplify custom-domain association, empty Gen 1 backend
  environment, deployment bucket, generated IAM roles, Hosting app
  `d385lcla48w64c`, and Amplify-managed CloudFront distribution.
- Removed the obsolete ACM validation CNAME after its Amplify certificate
  dependency was retired.
- Deleted non-authoritative Route 53 hosted zone `Z07780862CMV5DTRBAIND` while
  retaining the Route 53 domain registration and its Cloudflare nameservers.

### Fixed

- Fixed unnamed shared social-icon links, invalid nested resume download
  controls, color-only Portfolio links, and distorted project screenshots.
- Fixed late profile-image discovery and oversized/eager image loading that
  produced 7.3-11.8 second mobile LCP measurements at baseline.
- Resolved all npm audit findings in the development and build dependency tree.
- Fixed fake placeholder contact information that was included in the hidden
  body of generated contact-info emails.
- Fixed the footer typo "job oportunity" to "job opportunity."
- Updated the footer copyright from stale placeholder branding to
  "2026 Patrick Engelbert."
- Fixed scroll listener cleanup so the layout removes the same event handler it
  registers.
- Fixed invalid JSX in the portfolio page by replacing raw `class` attributes
  with `className`.
- Corrected low-risk portfolio wording and spelling, including "Check out" and
  "DBeaver."
- Restored Amplify team provider metadata to its tracked state after confirming
  it was required Amplify project metadata and only appeared dirty from local
  working-tree noise.

### Verified

- Lighthouse 12.8.2 final scores of 97-98 Performance and 100 Accessibility,
  Best Practices, and SEO on all five mobile core routes; all four categories
  scored 100 on the desktop core routes.
- Final mobile core-route LCP of 2.1-2.4 seconds, CLS of 0-0.008, TBT of 0,
  clean browser console, direct-route refreshes, and representative easter eggs.
- Cloudflare authority through Google Public DNS and Cloudflare's public
  resolver, with `cosmin.ns.cloudflare.com` and `ivy.ns.cloudflare.com` serving
  the domain.
- Production Pages TLS, Cloudflare response headers, canonical redirects for
  both protocols, path/query preservation, and absence of redirect loops.
- Live production routes and direct refreshes, local and S3 assets, both resume
  PDFs, external project links, contact-form render states, representative
  easter eggs, a clean browser console, and mobile layout at 390 x 844.
- Final Phase 3 AWS inventory: no Amplify apps, CloudFront distributions,
  CloudFormation stacks, account-managed ACM certificates, or Route 53 hosted
  zones remain; the registered domain and all nine
  `images-patrickengelbert` objects remain intact.
- End-to-end DNSSEC validation through Google Public DNS, Cloudflare, and
  AdGuard, including a matching parent DS, signed DNSKEY, authenticated address
  responses, and healthy production HTTPS routes.
- Cloudflare Pages production-branch build and deployment from `main`.
- Direct navigation and refresh behavior for all public nested routes on the
  temporary Pages hostname.
- Desktop and mobile parity between the Pages deployment and AWS production,
  including images, downloadable resumes, external links, contact-form render
  states, and representative easter eggs.
- `npm test`
- `npm run build`
- `npm audit`
- `git diff --check`
- Browser smoke check against the local Vite app, including home, footer,
  header social links, both resume pages, portfolio wording, Experience page,
  and contact form render states.

## [2026-06-03] Mission And Easter Egg Expansion

### Added

- Added the mission-focused easter egg layer and expanded the hidden discovery
  system beyond the home page.
- Added SpaceX-oriented secret-site access through a forgiving terminal command
  flow.
- Added easter egg rewards for recruiter-friendly exploration paths, including
  cross-linking between the software and robotics resumes.
- Added richer Trophy Room behavior for tracking discovered secrets and sharing
  progress.

### Changed

- Improved the terminal interaction so typed commands, launch-code discovery,
  hints, and cheat behavior feel more intentional.
- Polished the SpaceX mission brief route for better desktop and mobile first
  impressions.
- Added a post-visit navigation path back to the SpaceX section after a visitor
  discovers it.
- Refined the responsive resume navigation so medium-width layouts can collapse
  the two resume links into a dedicated Resumes dropdown.

### Fixed

- Fixed dropdown collapse behavior in the responsive resume navigation.
- Fixed mobile spacing on the mission brief page so the header does not cover
  the page title.
- Fixed launch-code terminal feedback so discovery is more visible.

## [2026-06-02] Modernization, Security, And Resume Split

### Added

- Added separate resume pages for software engineering and robotics and
  controls.
- Added updated profile imagery and support for new image assets.
- Added the SpaceX mission brief concept and portfolio easter egg foundations.
- Added a refreshed README with local development, build, testing, deployment,
  and security notes.

### Changed

- Migrated the app from Create React App to Vite to reduce outdated transitive
  dependencies and improve local build tooling.
- Updated dependency requirements to Node.js 20.19 or newer, with the project
  development target aligned to modern Node.
- Reworked resume content and navigation to support both software engineering
  and industrial controls career targets.
- Improved the robotics and controls resume to better emphasize PLC
  programming, robotics programming, integration, maintenance, and electrical
  skills.
- Improved resume section hover behavior and tightened resume spacing for a
  cleaner reading experience.
- Updated location details from Ottawa, Kansas to Waco, Texas.

### Fixed

- Addressed dependency audit concerns by replacing the older Create React App
  toolchain.
- Fixed mobile background behavior so scrolling is less visually jarring.
- Fixed profile-photo easter egg positioning and visibility refinements,
  including the crayon-style astronaut helmet animation.
- Fixed robotics cell reset state so the controls no longer appear active after
  reset.
- Corrected the Citizens experience date from 2023 to 2024.

## [2024-08-07] Resume Page Improvements

### Added

- Added a dedicated resume page with links to downloadable resume materials.
- Added resume navigation links to improve access from the rest of the site.

### Changed

- Styled the resume page for a more polished presentation.
- Removed a distracting animation from resume-related flows.
- Improved social metadata for link previews and sharing.

### Fixed

- Fixed minor resume and metadata issues discovered during resume-page polish.

## [2024-08-06] Resume And Animation Foundation

### Added

- Added a new resume page.
- Added text recoil animation and connected it to portfolio interactions.
- Added additional site animations to make the portfolio feel more interactive.

### Fixed

- Fixed `btn-primary` styling issues on non-home pages.
- Adjusted the recoil animation so it moves away from the viewer instead of
  toward the viewer.

## [2024-08-05] Background And Easter Egg Polish

### Changed

- Improved background behavior on longer pages.
- Updated the README to better reflect the project's goals and current state.

## [2024-08-02] Homepage, Footer, And Visual Improvements

### Added

- Added a background treatment, contact page, and clearer calls to action.
- Added more animation and interaction to encourage visitors to explore the
  homepage and portfolio.

### Changed

- Improved footer content and styling.
- Refactored header content styles across the Home and Portfolio components.
- Improved CSS across the site for a more engaging presentation.

## [2024-08-01] Security And Test Coverage

### Added

- Added basic tests for the Bio page.

### Fixed

- Fixed multiple dependency vulnerabilities reported by the package audit.

## [2024-07-31] Portfolio Expansion And AWS Image Fixes

### Added

- Added a new website/project entry to the portfolio.
- Expanded portfolio styling to make projects more visually prominent.

### Fixed

- Optimized images and adjusted asset handling so images render correctly in
  AWS-hosted builds.

## [2024-07-24] React, AWS, And Portfolio Stabilization

### Added

- Added Tikverse and Pomodoro projects to the portfolio.
- Added AWS backend support and initial AWS-oriented project configuration.
- Added basic login-functionality groundwork tied to the AWS setup.
- Added additional location and function details alongside social icon fixes.

### Changed

- Updated the project to React 18 and fixed related warnings.
- Updated package configuration to support the app's evolving AWS and React
  setup.
- Restored the site to a rendering, working state after earlier breakage.

### Fixed

- Fixed social icons after footer and dependency work caused regressions.
- Fixed rendering issues that prevented the site from working correctly.

## [2023-11-02] Content And Dependency Cleanup

### Changed

- Simplified the site by removing a large amount of outdated content.
- Altered article text and placement.
- Updated the footer and deprecated packages, with social icon follow-up work
  required afterward.

## [2022-04-29] Initial Portfolio Content

### Added

- Added portfolio-page links, images, and subtle animations.
- Added the first substantial portfolio-page structure and project content.

### Changed

- Made images more responsive.
- Replaced the profile photo with a higher-quality image.

## [2022-04-27] Basic Site Structure

### Added

- Added the first complete site structure and moved into content development.

## [2022-04-25] Project Initialization

### Added

- Initialized the project with Create React App.
