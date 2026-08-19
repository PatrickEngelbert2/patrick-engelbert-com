# Dependency and Security Audit

Audit date: 2026-08-19

## Scope

This audit covers npm dependencies, browser-loaded CDN dependencies, EmailJS
usage, likely secret patterns, repository history, public repository hygiene,
and the production build. It intentionally avoids unrelated modernization,
performance work, and visual changes.

## Baseline

The initial full `npm audit` reported four high-severity vulnerable packages.
All four were transitive dependencies under `devDependencies`. A separate
`npm audit --omit=dev` reported zero production dependency vulnerabilities.

| Package | Installed | Dependency path | Advisory identifiers | Vulnerable range | Patched version | Exposure |
| --- | --- | --- | --- | --- | --- | --- |
| `js-yaml` | 4.2.0 | `vite-plugin-svgr > @svgr/core > cosmiconfig > js-yaml` | GHSA-52cp-r559-cp3m; GHSA-5p4m-2wfm-xmqj | `>=4.0.0 <4.3.1` | 4.3.1 | Build-time configuration parsing only; the site does not parse visitor-supplied YAML. |
| `nanoid` | 3.3.12 | `vite > postcss > nanoid` | GHSA-28wg-ghj8-5hjv; GHSA-2v37-7h3g-55p8 | `<3.3.18` | 3.3.18 | Build tooling only; the application does not call Nano ID generators. |
| `postcss` | 8.5.15 | `vite > postcss` | GHSA-fxqj-rqcc-2cmp; GHSA-r28c-9q8g-f849 | `<=8.5.22` | 8.5.26 | Processes trusted local CSS during builds; it is not included as an executable browser dependency. |
| `undici` | 7.27.0 | `jsdom > undici` | See below | `>=7.0.0 <7.29.0` across the reported issues | 7.29.0 | Test environment only; the production site and Cloudflare Pages runtime do not use jsdom's HTTP client. |

The Undici finding grouped the following advisories under one vulnerable
package: GHSA-vmh5-mc38-953g, GHSA-p88m-4jfj-68fv,
GHSA-vxpw-j846-p89q, GHSA-hm92-r4w5-c3mj,
GHSA-g8m3-5g58-fq7m, GHSA-pr7r-676h-xcf6,
GHSA-8xcm-r25x-g524, GHSA-4cwx-7wf7-3272,
GHSA-m8rv-5g2x-5cg5, GHSA-jr45-8vmc-qm54,
GHSA-v3r7-h72x-cjcm, and GHSA-35p6-xmwp-9g52.

## Remediation

A normal `npm audit fix` updated only the lockfile-resolved transitive versions:

- `js-yaml` 4.2.0 to 4.3.1
- `nanoid` 3.3.12 to 3.3.18
- `postcss` 8.5.15 to 8.5.26
- `undici` 7.27.0 to 7.29.0

No direct dependency range, major version, or application architecture changed.
`npm audit fix --force` was not used.

## Browser Dependencies

Bootstrap 4.5.2 CSS remains because the application extensively uses its grid,
spacing, typography, image, form, navbar, and button classes. It is static CSS
and does not execute code.

Repository searches found no direct jQuery usage and no Open Iconic classes.
Bootstrap JavaScript was used only for the mobile navbar collapse, and Popper
was not required by that component. The navbar now uses React state while
preserving the same Bootstrap collapse classes. This allowed removal of:

- jQuery 3.5.1 Slim
- Popper 1.16.1
- Bootstrap 4.5.2 JavaScript
- Open Iconic 1.1.1 CSS

The npm-managed Bootstrap Icons package remains because `bi` icon classes are
used by the site.

## EmailJS

The two contact forms use the expected EmailJS browser integration. The client
contains service IDs, template IDs, and a public browser key, all of which are
necessarily visible in a frontend-only EmailJS application. No EmailJS private
key, account password, or server credential was found. EmailJS behavior and
form payloads were not changed.

## Secret and Repository Hygiene

Neither Gitleaks nor TruffleHog was installed, so the repository was scanned
with tracked-file and Git-history searches for common AWS, GitHub, private-key,
token, credential, environment-file, and session-artifact patterns.

No AWS access keys, GitHub tokens, private keys, Cloudflare API tokens, OAuth
secrets, database credentials, browser cookies, or session artifacts were
found. Historical `.env.sample` files contained local/example configuration,
not production secrets.

The tracked Amplify provider file contains AWS account and resource identifiers
used by the retained rollback configuration. These identifiers are not
authentication credentials. The DNS snapshots contain public DNS data and no
Cloudflare or AWS authentication material.

Build output, dependencies, coverage, local Amplify state, and local environment
files are ignored. The ignore rules now also cover generic `.env` and `.env.*`
files while allowing a deliberate `.env.example` template.

## Verification

- Full audit before: four high-severity vulnerable transitive packages
- Production-only audit before: zero vulnerabilities
- Full audit after: zero vulnerabilities
- Tests: 2 files and 3 tests passed
- Production build and route-specific SEO validation: passed for 11 routes
- Direct loads, nested refreshes, the 404 route, forms, images, resume PDFs,
  mobile and desktop navigation, and key easter eggs: passed
- Browser console: no warnings or errors

## Deferred Work

No major dependency migration is required to resolve this audit. A future,
separately scoped maintenance pass may evaluate replacing the deprecated
`emailjs-com` package name with the current EmailJS browser package and moving
away from Bootstrap 4 CSS. Neither change is necessary for the security fixes
documented here.
