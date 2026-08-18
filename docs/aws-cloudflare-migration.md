# AWS to Cloudflare Pages Migration

## Status

Phase 1 was audited and prepared on August 17, 2026. Phase 2 was completed the
same day. Production DNS is now authoritative on Cloudflare, and the canonical
`www` hostname is served by the Git-connected Cloudflare Pages project.

- Production: [`https://www.patrickengelbert.com`](https://www.patrickengelbert.com)
- Apex: redirects permanently to the matching `www` path
- Pages project: `patrick-engelbert-com`
- Pages fallback URL:
  [`https://patrick-engelbert-com.pages.dev`](https://patrick-engelbert-com.pages.dev)
- Registrar: Route 53 Registrar (unchanged)
- AWS hosting and DNS resources: retained as rollback targets
- Required S3 asset bucket: retained and still used by the live application

## Current Architecture

```text
GitHub main branch
       |
       v
Cloudflare Pages (build and deploy)
       |
       v
www.patrickengelbert.com

Route 53 Registrar
       |
       v
Cloudflare authoritative DNS
       |-- apex -> Cloudflare Redirect Rules -> www
       |-- www -> Cloudflare Pages
       `-- ACM validation CNAME retained for AWS rollback

AWS Amplify + CloudFront + Route 53 hosted zone (retained, not authoritative)
```

The site is a React 18 single-page application bundled with Vite. React Router
5 uses browser history, so every application route must fall back to
`index.html` when it is requested directly.

### Application build contract

| Setting | Value |
| --- | --- |
| Package manager | npm (`package-lock.json`) |
| Node version | 22 (`.nvmrc`) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `build` |
| Runtime environment variables | None |
| Production branch | `main` |

Cloudflare Pages serves a single-page application fallback when the deployment
does not contain a top-level `404.html`. This repository intentionally has no
top-level `404.html`, so an additional `_redirects` file is not required. Direct
loads and refreshes of nested routes were verified on both the Pages fallback
hostname and the production custom domain.

EmailJS identifiers are currently embedded in the client bundle. They are not
Amplify environment variables and do not require Cloudflare build variables.
They should be treated as public client configuration and restricted through
the EmailJS dashboard where supported.

## AWS Inventory

### Amplify Hosting

- App: `patrick-engelbert-com`
- App ID: `d385lcla48w64c`
- Region: `us-east-2`
- Repository: `PatrickEngelbert2/patrick-engelbert-com`
- Production branch: `main`
- Automatic builds: enabled
- Access: public
- Amplify URL: `https://main.d385lcla48w64c.amplifyapp.com`
- Custom domain: `patrickengelbert.com`
- Canonical behavior: apex redirects to `www`; `www` serves `main`
- Custom headers: none
- Incoming webhooks: none
- Secrets: none

The Amplify build runs `amplifyPush --simple`, then `npm ci` and
`npm run build`, and publishes `build/`. The only branch-level variables are
Amplify metadata (`AMPLIFY_BACKEND_APP_ID`, `USER_BRANCH`, and
`_LIVE_UPDATES`); the frontend has no required runtime variables.

### Amplify Gen 1 backend

The `main` backend environment has no configured Auth, API, Storage, Analytics,
or Function categories. Its CloudFormation stack,
`amplify-patrickengelbertcom-main-3bd30`, contains only the Amplify deployment
bucket, its bucket policy, and the generated authenticated and unauthenticated
IAM roles.

The tracked `amplify/team-provider-info.json` references a separate historical
`staging` environment and App ID `d2ufynu2v3fn7v`. It does not describe the live
hosting app. It is retained during Phase 1 so migration preparation does not
silently remove project metadata; it should be reviewed before final AWS
decommissioning.

### S3

| Bucket | Purpose | Phase 2 action |
| --- | --- | --- |
| `amplify-patrickengelbertcom-main-3bd30-deployment` | Amplify deployment artifacts | Remove only with the retired Amplify backend stack |
| `images-patrickengelbert` | Public images and a software resume PDF used by the live app | Keep until every referenced asset is migrated and verified |

The application currently references `images-patrickengelbert` directly from
`Bio.jsx`, `Portfolio.jsx`, and `Resume.jsx`. Moving web hosting does not remove
this S3 dependency.

## Route 53 Inventory

- Public hosted zone: `patrickengelbert.com`
- Hosted zone ID: `Z07780862CMV5DTRBAIND`
- Record count: 5
- Registrar: Route 53 Registrar

The hosted zone remains intact but is no longer authoritative. The registrar
now delegates the domain to Cloudflare. The original five-record snapshot is
retained in [`route53-records.json`](route53-records.json) for rollback.

The machine-readable audit snapshot is in
[`route53-records.json`](route53-records.json).

There are currently no MX, TXT, SPF, DKIM, DMARC, CAA, AAAA, or email-related
records in this hosted zone. This must be checked again immediately before a
nameserver change because DNS records can be added after this audit.

## Cost Baseline

AWS estimated charges for August 1-17, 2026 were:

| Service | Estimated cost | Detail |
| --- | ---: | --- |
| Route 53 | $0.50 | One hosted zone; queries were within no-charge usage |
| Amplify | $0.05 | $0.03 build time and $0.02 bandwidth |
| S3 and other observed services | $0.00 | Current estimated usage |
| **Total** | **$0.55** | Month-to-date estimate at audit time |

The Route 53 hosted zone is the recurring approximately $0.50 monthly charge.
Amplify charges vary with builds, bandwidth, and storage. Domain registration
is a separate annual cost and should remain in place unless the registrar is
deliberately migrated later.

## Cloudflare Pages Configuration

The Pages project must use Git integration, not Direct Upload, so pushes and
pull requests continue to produce automatic deployments and previews.

| Setting | Required value |
| --- | --- |
| Repository | `PatrickEngelbert2/patrick-engelbert-com` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `build` |
| Root directory | `/` |
| Environment variables | None |
| Custom domains | `www.patrickengelbert.com` |

Only the website repository should be granted to the Cloudflare GitHub App.
The initial deployment must use a temporary `pages.dev` hostname. Production
custom domains are explicitly deferred to Phase 2.

### Deployed project

| Setting | Deployed value |
| --- | --- |
| Project name | `patrick-engelbert-com` |
| Production URL | `https://patrick-engelbert-com.pages.dev` |
| Initial immutable deployment | `https://8bc45842.patrick-engelbert-com.pages.dev` |
| Initial commit | `f3c51e5` |
| Git integration | Cloudflare GitHub App, limited to this repository |
| Production branch | `main` |
| Automatic deployments | Enabled |
| Build system | Version 3 |
| Build command | `npm run build` |
| Build output directory | `build` |
| Root directory | Repository root |
| Variables and secrets | None |
| Custom domains | `www.patrickengelbert.com` (Active, SSL enabled) |

## Phase 1 Verification

Local checks completed on Node 22:

- `npm ci`
- `npm test` (3 tests passed)
- `npm run build`
- Confirmed that Vite publishes the expected static files to `build/`

Cloudflare Pages verification completed against the temporary hostname:

- `/`, `/portfolio`, `/contact`, `/resume/software-engineering`,
  `/resume/robotics-controls`, and `/spacex` returned HTTP 200 and rendered the
  expected page content.
- Direct navigation and an explicit browser reload succeeded on every requested
  nested route. The custom React 404 experience also rendered on an unknown
  route, confirming the Pages single-page application fallback.
- All rendered images reported valid natural dimensions. This included bundled
  profile and project assets plus the existing S3-hosted portfolio images.
- The bundled robotics resume and S3-hosted software resume both returned HTTP
  200 from their public download URLs.
- LinkedIn, the canonical GitHub profile, Walk the Rosary, its source repository,
  Tikverse, and the Pomodoro Timer resolved to the intended destinations.
- Both contact forms rendered, required their expected fields, accepted test
  input, and kept their submit controls available. No message was submitted, so
  the audit did not send test email or alter EmailJS data.
- Representative easter eggs were exercised successfully: Liftoff and its
  helmet overlay, Operator Mode, the Trophy Room and hidden descriptions, the
  keyboard launch sequence, terminal help and `sudo hire patrick`, the robotics
  commissioning sequence, and SpaceX Orbit Check.
- The browser console remained free of warnings and errors during desktop,
  mobile, route, form, and easter egg checks.
- At 390 x 844, the requested routes had no horizontal document overflow,
  broken images, or hidden mobile navigation. The SpaceX heading began below
  the mobile header.

The generated HTML and the hashed CSS and JavaScript bundles served by Pages
were byte-for-byte equal to those served by the AWS production hostname at the
time of comparison. Normalized desktop and mobile screenshots showed no
material visual difference. Production remained available throughout testing.

## Phase 2 Cutover Record

### Pre-change audit and DNSSEC

The Route 53 zone was re-audited immediately before the cutover. Its five
records matched the Phase 1 snapshot exactly. There were still no AAAA, MX, TXT,
CAA, SPF, DKIM, DMARC, or other email records.

DNSSEC was not enabled:

- Route 53 hosted-zone signing status: `Not signing`
- Route 53 key-signing keys: none
- Route 53 Registrar DNSSEC status: `Not configured`
- Registrar DNSSEC keys: none
- Public parent-zone DS lookup: no DS records

No DNSSEC or DS change was required. Cloudflare DNSSEC remains disabled for the
initial monitoring period and can be enabled in a separate follow-up after the
new authoritative DNS configuration is stable.

### Delegation

The registrar nameserver change was made on August 17, 2026 at approximately
16:10 CDT (21:10 UTC). The domain remains registered with Route 53 Registrar.

Previous Route 53 nameservers:

- `ns-1937.awsdns-50.co.uk`
- `ns-1496.awsdns-59.org`
- `ns-828.awsdns-39.net`
- `ns-166.awsdns-20.com`

Current Cloudflare nameservers:

- `cosmin.ns.cloudflare.com`
- `ivy.ns.cloudflare.com`

Google Public DNS and Cloudflare's public resolver both returned the new
delegation. The Cloudflare zone subsequently reported `Active`.

### Current Cloudflare DNS

Cloudflare contains three user-managed records. Provider-generated NS and SOA
records are not counted here. A machine-readable snapshot is in
[`cloudflare-dns-records.json`](cloudflare-dns-records.json).

| Name | Type | Target | Proxy | TTL | Purpose |
| --- | --- | --- | --- | --- | --- |
| `patrickengelbert.com` | CNAME | `d1rdjyqzbz8rsj.cloudfront.net` | Proxied | Auto | Gives Redirect Rules a proxied apex; AWS remains the fallback origin |
| `www` | CNAME | `patrick-engelbert-com.pages.dev` | Proxied | Auto | Cloudflare Pages production hostname |
| `_8a2cb37a6bfb7bdb5e9d61c6b6653023` | CNAME | `_383530f4f9d9d028294096b2e0206b0e.xdvyhgsvzs.acm-validations.aws` | DNS only | Auto | Preserves AWS certificate validation for rollback |

The apex differs from the Route 53 `A` alias because Cloudflare uses a flattened
CNAME at the zone root. No mail records were created because the previous zone
did not contain or require them.

### Zero-downtime sequence

1. Cloudflare was populated with DNS-only apex, `www`, and validation records
   pointing to the existing AWS configuration.
2. The registrar delegation was changed to Cloudflare.
3. Independent DNS checks confirmed Cloudflare authority, while HTTP headers
   still showed CloudFront and Amazon S3. The site and nested routes remained
   available during this intermediate state.
4. `www.patrickengelbert.com` was attached through the Pages custom-domain
   workflow, which replaced the `www` target with
   `patrick-engelbert-com.pages.dev` and enabled proxying.
5. The apex record was proxied and two native Single Redirect rules were
   deployed: one for HTTP and one for HTTPS. Both return `301`, preserve the
   path and query string, and target the canonical `www` hostname.
6. Pages reported the custom domain as `Active` with `SSL enabled`.

The explicit HTTP and HTTPS rules avoid relying on a combined wildcard pattern
whose behavior was inconsistent during validation.

### Production verification

The live production domain was verified after the switch:

- `http://patrickengelbert.com`, `https://patrickengelbert.com`, and
  `http://www.patrickengelbert.com` each reach the canonical HTTPS `www` URL in
  one redirect, with path and query string preserved and no loop.
- `https://www.patrickengelbert.com` returns HTTP 200 from Cloudflare. Response
  headers include `Server: cloudflare` and `CF-RAY` and no longer include the
  CloudFront `Via` or `X-Amz-Cf-*` headers seen before the hosting switch.
- The production HTML and hashed CSS/JavaScript asset names are byte-for-byte
  identical to the verified `pages.dev` deployment.
- Direct navigation and browser refresh passed for `/portfolio`, `/contact`,
  `/contact/message`, `/contact/request-contact-info`,
  `/resume/software-engineering`, `/resume/robotics-controls`, `/spacex`, and an
  invalid route that rendered the React lost-signal 404 experience.
- Local profile, rocket, and Walk the Rosary assets loaded with valid rendered
  dimensions. All S3-hosted portfolio images also loaded successfully.
- The bundled robotics resume and S3-hosted software resume returned HTTP 200
  with `application/pdf` content types.
- GitHub, Walk the Rosary, Tikverse, Pomodoro Timer, and Stuffi returned HTTP
  200. LinkedIn returned its normal automated-client `999` response; the link
  target is unchanged and correct in the rendered site.
- Both EmailJS forms rendered with their expected required inputs and submit
  controls. No test email was sent.
- Liftoff, Operator Mode, Trophy Room, terminal help, lost-signal recovery,
  robotics commissioning, and SpaceX Orbit Check were exercised successfully.
- A fresh production browser tab reported no console warnings or errors.
- At 390 x 844, the home and SpaceX pages rendered without header overlap,
  horizontal overflow, or broken assets.

### Preserved AWS rollback resources

No AWS resource was deleted, disabled, detached, or transferred. The following
were rechecked after production moved to Pages:

- Amplify app `patrick-engelbert-com` (`d385lcla48w64c`) still exists with its
  `main` branch, and its `amplifyapp.com` URL returns HTTP 200.
- Route 53 hosted zone `Z07780862CMV5DTRBAIND` still exists with all five
  original records.
- The `images-patrickengelbert` bucket still exists with all nine objects and
  remains a live application dependency.
- The ACM validation CNAME remains present in both Route 53 and Cloudflare.
- The existing CloudFront hostname still resolves and responds. The direct
  distribution hostname expects the configured application host, while the
  Amplify hostname remains the simplest end-to-end rollback health check.

The ACM console did not expose account-owned certificates in `us-east-1` or
`us-east-2`; Amplify manages the custom-domain certificate relationship. No
certificate resource or validation record was removed.

### Exact rollback procedure

For a Pages-only problem while Cloudflare DNS is healthy:

1. In Cloudflare DNS, edit the `www` CNAME target from
   `patrick-engelbert-com.pages.dev` to `d1rdjyqzbz8rsj.cloudfront.net`.
2. Set the `www` record to `DNS only`, matching the tested intermediate state.
3. Leave the two apex-to-`www` Redirect Rules active. They will continue to
   canonicalize both protocols while `www` serves AWS.
4. Verify `/`, `/portfolio`, both resumes, `/contact`, and `/spacex`; confirm
   CloudFront/Amazon S3 headers on `www`.

For a Cloudflare DNS or account-wide problem:

1. In Route 53 Registrar, restore all four previous Route 53 nameservers listed
   above, exactly as recorded.
2. Do not edit or recreate the Route 53 hosted-zone records; the complete
   five-record rollback zone is already intact.
3. Monitor Google Public DNS and Cloudflare public DNS until they return the
   Route 53 nameservers.
4. Verify the AWS apex-to-`www` redirect, TLS, routes, PDFs, and S3 assets.

### Phase 3 eligibility

Monitor production for at least 72 hours after the Phase 2 cutover. If DNS,
redirects, Pages deployments, contact forms, and external assets remain stable,
Phase 3 may retire Amplify hosting and then delete the non-authoritative Route
53 hosted zone. Keep Route 53 domain registration and the
`images-patrickengelbert` bucket. Migrating those S3 URLs is a separate project
and must happen before that bucket can be considered for removal.
