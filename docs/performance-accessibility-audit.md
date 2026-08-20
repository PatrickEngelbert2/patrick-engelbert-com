# Performance and Accessibility Audit

## Scope and Method

This audit was performed on the post-security baseline from `main` and the
`performance/accessibility-audit` branch. Measurements used the production
Vite build through a local `vite preview` server. Lighthouse CLI 12.8.2 was run
with the same defaults before and after each change:

- Mobile: Lighthouse mobile throttling, plus manual and DevTools checks at
  390 x 844 with Slow 4G and 4x CPU throttling.
- Desktop: Lighthouse desktop preset and manual checks at 1440 x 900.
- Core routes: `/`, `/portfolio`, both resume routes, and `/contact`.
- Spot checks: both nested contact forms, `/spacex`, 404 behavior, downloadable
  resumes, external links, responsive navigation, and easter eggs.

Times below are milliseconds. Synthetic results naturally vary slightly
between runs. Chrome DevTools did not report CrUX field data for the tested
pages, and the public PageSpeed API was rate-limited, so no field metrics are
claimed.

## Baseline

### Mobile

| Route | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | SI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 74 | 95 | 100 | 100 | 1,807 | 11,786 | 0.000 | 0 | 1,807 |
| Portfolio | 75 | 96 | 100 | 92 | 1,806 | 7,958 | 0.000 | 0 | 1,806 |
| Software resume | 75 | 95 | 100 | 100 | 1,805 | 7,357 | 0.000 | 0 | 1,805 |
| Robotics resume | 75 | 95 | 100 | 100 | 1,804 | 7,356 | 0.000 | 0 | 1,804 |
| Contact | 75 | 95 | 100 | 100 | 1,654 | 7,356 | 0.005 | 0 | 1,654 |

### Desktop

| Route | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | SI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 90 | 95 | 100 | 100 | 460 | 2,049 | 0.010 | 0 | 460 |
| Portfolio | 96 | 91 | 100 | 92 | 445 | 1,409 | 0.000 | 0 | 445 |
| Software resume | 97 | 87 | 100 | 100 | 440 | 1,327 | 0.000 | 0 | 440 |
| Robotics resume | 97 | 91 | 100 | 100 | 440 | 1,326 | 0.000 | 0 | 440 |
| Contact | 97 | 92 | 100 | 100 | 487 | 1,326 | 0.002 | 0 | 487 |

## Ranked Findings

1. **Sitewide image payload:** the fixed background was a 1.10 MB PNG loaded on
   every route. The 798 kB profile JPEG and eager S3 portfolio screenshots made
   home and Portfolio transfers especially expensive.
2. **Homepage LCP discovery:** the profile image was the LCP element, but the SPA
   did not expose it until JavaScript rendered the page. A baseline DevTools
   trace found 1,382 ms of resource discovery delay.
3. **Unused icon system:** Bootstrap Icons shipped roughly 95 kB of CSS and a
   130 kB font for seven small icons. The font also used blocking display
   behavior.
4. **Accessibility defects:** shared social icon links had no accessible names;
   resume and Portfolio blues failed contrast; inline links relied on color;
   the site had no skip link; and resume download links nested buttons inside
   anchors.
5. **Form feedback:** labels and required fields were present, but `alert()`
   feedback was disruptive and not integrated with the form. Submitting state
   existed but lacked a form-level busy state and automated coverage.
6. **Route loading:** all page code, including EmailJS forms and hidden pages,
   loaded initially. Splitting every route was tested but rejected because the
   asynchronous page boundary caused measurable CLS. Only secondary routes
   were split.
7. **Caching:** production fingerprinted assets were cached for four hours,
   shorter than necessary for immutable hashed filenames.

The recoil effect was not a bottleneck. It already batches pointer work with
`requestAnimationFrame`, stores stable element references, skips touch and
reduced-motion environments, and produced no long tasks or TBT in the audits.

## Changes Implemented

- Re-encoded the existing background as a visually equivalent 47 kB WebP and
  the profile photo as a 53 kB, 720 x 960 WebP.
- Added a home-only high-priority preload for the profile LCP image. Generated
  non-home route HTML removes that preload to avoid waste.
- Replaced S3 screenshot rendering with visually equivalent optimized local
  WebP files, added 640 px responsive candidates, stable dimensions,
  `decoding="async"`, and lazy loading below the featured project.
- Removed Bootstrap Icons and replaced its seven uses with the existing rocket
  asset and small CSS/text icon marks.
- Split Bio, Experience, SpaceX, 404, and both EmailJS form routes into deferred
  chunks. Core public routes remain synchronous to preserve navigation speed
  and prevent CLS.
- Added a keyboard-visible skip link, global visible focus treatment, semantic
  resume download links, accessible names for icon links, decorative SVG
  hiding, and `aria-current` on the active resume selector.
- Darkened existing blue accents only where needed for WCAG contrast and added
  non-color link affordances in Portfolio body copy.
- Corrected distorted Portfolio screenshot sizing with `object-fit: contain`.
- Replaced form alerts with inline success/error live regions, added
  `aria-busy`, retained EmailJS service behavior, and added form submission
  tests using mocked network calls.
- Added a global reduced-motion guard while retaining normal animations. The
  recoil effect remains disabled for reduced-motion and touch users.
- Added Cloudflare Pages `_headers` rules: one-year immutable caching for
  fingerprinted assets and one-day caching for PDFs and the social preview.

## Bundle and Network

| Artifact | Before | After | Change |
| --- | ---: | ---: | ---: |
| Main JavaScript | 252.54 kB (78.76 kB gzip) | 245.02 kB (78.93 kB gzip) | -7.52 kB raw; gzip effectively flat |
| Main CSS | 123.51 kB (23.56 kB gzip) | 38.81 kB (8.77 kB gzip) | -68.6% raw; -62.8% gzip |
| Background | 1,100.36 kB PNG | 47.25 kB WebP | -95.7% |
| Profile photo | 797.82 kB JPEG | 53.39 kB WebP | -93.3% |
| Bootstrap Icons font | 130.39 kB WOFF2 | Removed | -100% |

Initial route transfer weight from Lighthouse:

| Route | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | ---: | ---: | ---: | ---: |
| Home | 2,001 kB | 232 kB | 2,001 kB | 232 kB |
| Portfolio | 2,581 kB | 212 kB | 2,581 kB | 369 kB |
| Software resume | 1,215 kB | 172 kB | 1,215 kB | 172 kB |
| Robotics resume | 1,215 kB | 172 kB | 1,215 kB | 172 kB |
| Contact | 1,215 kB | 172 kB | 1,215 kB | 172 kB |

Request counts stayed stable on most routes because large resources were
replaced rather than multiplied. Mobile Portfolio fell from 15 to 13 requests.
The optimized secondary-route chunks range from roughly 0.8 to 3.7 kB before
gzip, excluding their small route CSS.

## Accessibility Results

- Baseline automated scores ranged from 87 to 96. Final scores are 100 on every
  audited mobile and desktop core route, with no failed scored Accessibility,
  Best Practices, or SEO audits.
- Keyboard checks confirmed logical Tab order, visible focus, skip-link focus
  transfer to `main`, resume dropdown open/close behavior, terminal input, and
  Trophy Room controls without a keyboard trap.
- Heading order, landmarks, RecoilText semantic text, lists, labels, required
  fields, image alternatives, and touch controls were inspected in the browser
  accessibility tree.
- Both forms expose pending and result state to assistive technology. Tests
  verify EmailJS parameters and the centralized real contact-information body
  without sending real email.
- Reduced-motion users receive near-instant transitions and no recoil movement;
  normal animation and easter-egg behavior remain available to other users.

## Final Measurements

### Mobile

| Route | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | SI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 97 | 100 | 100 | 100 | 1,655 | 2,405 | 0.000 | 0 | 1,655 |
| Portfolio | 98 | 100 | 100 | 100 | 1,655 | 2,332 | 0.000 | 0 | 1,655 |
| Software resume | 98 | 100 | 100 | 100 | 1,655 | 2,105 | 0.000 | 0 | 1,655 |
| Robotics resume | 98 | 100 | 100 | 100 | 1,653 | 2,103 | 0.000 | 0 | 1,653 |
| Contact | 98 | 100 | 100 | 100 | 1,653 | 2,103 | 0.008 | 0 | 1,653 |

### Desktop

| Route | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT | SI |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 | 441 | 570 | 0.017 | 0 | 441 |
| Portfolio | 100 | 100 | 100 | 100 | 474 | 637 | 0.000 | 0 | 474 |
| Software resume | 100 | 100 | 100 | 100 | 444 | 486 | 0.000 | 0 | 444 |
| Robotics resume | 100 | 100 | 100 | 100 | 444 | 484 | 0.000 | 0 | 444 |
| Contact | 100 | 100 | 100 | 100 | 445 | 484 | 0.003 | 0 | 445 |

A matched DevTools homepage trace at 390 x 844, Slow 4G, and 4x CPU measured
LCP at 1,645 ms versus 2,054 ms at baseline. The final trace reports CLS 0.00,
no LCP discovery failure, and no CrUX field sample.

## Regression Verification

- `npm test`: 3 files and 5 tests passed.
- `npm run build`: passed, including route metadata generation and SEO
  validation.
- `npm audit`: zero vulnerabilities after removing Bootstrap Icons.
- All core and spot-check routes returned the app on direct navigation and
  refresh; generated metadata remained route-specific.
- Local and S3 resume PDFs returned PDF responses. GitHub and Walk the Rosary
  returned HTTP 200. LinkedIn rejected `HEAD` with 405, while its canonical URL
  and accessible link were verified in the rendered site.
- Browser console: no warnings, errors, or reported issues during the final
  route and interaction pass.
- Mobile and desktop screenshots verified the home, Portfolio, resumes,
  contact flow, and SpaceX mission brief without overlap.
- Rocket/helmet, Trophy Room, Mission Brief return, resume dropdown, launch-code
  sequence, terminal help, and shared easter-egg state remained functional.

## Deferred Recommendations

- Bootstrap 4.5 CSS remains a roughly 25 kB compressed external render-blocking
  stylesheet. Removing it would require a broader CSS framework migration and
  was not justified in this focused pass.
- The shared easter-egg provider and primary route content remain in the main
  bundle. More aggressive splitting caused CLS in testing and would require a
  provider/loading architecture change to improve real UX.
- The original PNG/JPEG files remain as authoring sources but are no longer
  shipped by the production build. Repository cleanup can be handled separately
  if desired.
- The 597 kB social preview is fetched by crawlers rather than normal page
  visits. It can be re-encoded later if social-platform compatibility is first
  revalidated.
- Real-user monitoring would be needed to establish field Core Web Vitals; no
  reliable CrUX sample was available during this audit.
