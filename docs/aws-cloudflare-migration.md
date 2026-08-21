# AWS to Cloudflare Pages Migration

## Status

Phase 1 was audited and prepared on August 17, 2026. Phase 2 was completed the
same day, and Phase 3 retired the obsolete AWS hosting and hosted-zone rollback
resources on August 21, 2026. Production DNS is authoritative on Cloudflare,
and the canonical `www` hostname is served by the Git-connected Cloudflare
Pages project. Cloudflare DNSSEC was enabled and registered with Route 53
Registrar later that day as a separate post-migration hardening step.

- Production: [`https://www.patrickengelbert.com`](https://www.patrickengelbert.com)
- Apex: redirects permanently to the matching `www` path
- Pages project: `patrick-engelbert-com`
- Pages fallback URL:
  [`https://patrick-engelbert-com.pages.dev`](https://patrick-engelbert-com.pages.dev)
- Registrar: Route 53 Registrar (unchanged)
- Former AWS hosting and hosted zone: retired after final verification
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
       `-- www -> Cloudflare Pages

AWS Route 53 Registrar (registration only)
AWS S3 images-patrickengelbert (retained production assets)
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

### Retired Amplify resources

Amplify Hosting app `d385lcla48w64c` in `us-east-2` was deleted during Phase 3.
Its custom-domain association was removed first. The empty Gen 1 `main` backend
environment was then deleted through Amplify, which removed CloudFormation stack
`amplify-patrickengelbertcom-main-3bd30`, its deployment bucket and bucket
policy, and the generated authenticated and unauthenticated IAM roles. Deleting
the Hosting app subsequently removed its branch, Amplify hostname, and managed
CloudFront distribution.

Post-deletion checks found zero Amplify apps, CloudFront distributions,
CloudFormation stacks, and account-managed ACM certificates. Historical App ID
`d2ufynu2v3fn7v` did not exist and was not part of the cleanup. The tracked
`amplify/` directory remains repository history and is not used by the
Cloudflare Pages build.

### S3

| Bucket | Purpose | Final status |
| --- | --- | --- |
| `amplify-patrickengelbertcom-main-3bd30-deployment` | Former Amplify deployment artifacts | Deleted with the Gen 1 backend stack |
| `images-patrickengelbert` | Public images and a software resume PDF used by the live app | Retained; nine objects verified after Phase 3 |

The application currently references `images-patrickengelbert` directly from
`Bio.jsx` and `Resume.jsx`. The live background image and software resume PDF
returned HTTP 200 after every destructive Phase 3 step.

## Route 53 Inventory

Route 53 continues to register `patrickengelbert.com`, with auto-renew enabled
and the registrar nameservers unchanged at `cosmin.ns.cloudflare.com` and
`ivy.ns.cloudflare.com`. Non-authoritative hosted zone
`Z07780862CMV5DTRBAIND` was deleted during Phase 3 after its only non-default
record was removed. Amplify had already removed the old apex and `www` records
when its custom-domain association was detached.

The original five-record hosted-zone snapshot remains in
[`route53-records.json`](route53-records.json) as historical migration evidence.
The final pre-deletion check confirmed no MX, TXT, SPF, DKIM, DMARC, CAA, AAAA,
or other newly added records. At that checkpoint, DNSSEC signing was `Not
signing`, no KSK existed, the registrar had no DNSSEC keys, and public resolvers
returned no DS record. DNSSEC was enabled after Phase 3 as documented below.

## Cost Baseline

AWS estimated charges refreshed on August 21, 2026 after Phase 3 were:

| Service | Estimated cost | Detail |
| --- | ---: | --- |
| Route 53 | $0.50 | Hosted-zone charge already incurred before deletion |
| Amplify | $0.12 | Build, hosting, and bandwidth usage already incurred before deletion |
| S3 and other observed services | $0.00 | Current estimated usage |
| **Total** | **$0.62** | Month-to-date estimate; prior charges remain billable |

No future Amplify hosting/build charge or Route 53 hosted-zone charge should
recur after Phase 3. Already-incurred August charges will not be reversed.
Domain registration remains a separate annual cost, and retained S3 usage
continues to be billed normally if it rises above the free tier.

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

Cloudflare contains two user-managed records. Provider-generated NS and SOA
records are not counted here. A machine-readable snapshot is in
[`cloudflare-dns-records.json`](cloudflare-dns-records.json).

| Name | Type | Target | Proxy | TTL | Purpose |
| --- | --- | --- | --- | --- | --- |
| `patrickengelbert.com` | A | `192.0.2.1` | Proxied | Auto | Originless placeholder that allows the apex Redirect Rules to execute |
| `www` | CNAME | `patrick-engelbert-com.pages.dev` | Proxied | Auto | Cloudflare Pages production hostname |

The apex uses the TEST-NET address recommended by Cloudflare for a proxied,
redirect-only hostname; requests are redirected at Cloudflare and do not reach
that address. The ACM validation CNAME was removed after its Amplify domain and
certificate relationship was deleted. No mail records were removed or created.

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

## Phase 3 Completion Record

Phase 3 ran on August 21, 2026 at approximately 14:45 CDT, after more than 72
hours of stable Cloudflare production operation.

### Retirement sequence

1. Replaced the proxied apex CloudFront CNAME with proxied `A` record
   `192.0.2.1`, retaining TTL Auto and both canonical Redirect Rules.
2. Verified all HTTP/HTTPS apex and `www` variants, path and query preservation,
   TLS, Pages headers, and nested routes before touching AWS.
3. Removed the Amplify `patrickengelbert.com` custom-domain association and
   confirmed Pages remained Active with SSL enabled.
4. Deleted the empty Gen 1 `main` backend environment. AWS removed its
   CloudFormation stack, deployment bucket and policy, and both generated IAM
   roles.
5. Deleted Amplify app `d385lcla48w64c`. Post-deletion inventory showed zero
   Amplify apps, CloudFront distributions, CloudFormation stacks, and ACM
   certificates in both checked regions.
6. Removed the obsolete ACM validation CNAME from Cloudflare after confirming
   its only dependency was gone.
7. Reconfirmed registrar delegation, public Cloudflare authority, absent email
   records, and disabled DNSSEC signing. Removed the hosted zone's final
   non-default CNAME, then deleted `Z07780862CMV5DTRBAIND` without changing the
   registered domain.

### Final verification

- Google Public DNS, Cloudflare, and AdGuard returned only
  `cosmin.ns.cloudflare.com` and `ivy.ns.cloudflare.com`, with Cloudflare SOA
  data and Cloudflare proxy addresses.
- HTTP apex, HTTPS apex, and HTTP `www` returned one-hop `301` redirects to
  HTTPS `www`. Paths and query strings were preserved with no loops.
- HTTPS `www` returned HTTP 200 with `Server: cloudflare`; Pages custom-domain
  status remained `Active` with `SSL enabled`.
- Direct loads and browser refreshes passed for the homepage, portfolio,
  contact routes, both resumes, `/spacex`, and the custom React 404. The browser
  console remained clear.
- JavaScript, CSS, bundled and lazy images, both resume PDFs, `robots.txt`,
  `sitemap.xml`, and `social-preview.png` returned successfully.
- Both EmailJS forms rendered with enabled required inputs and submit controls;
  no test email was sent.
- `images-patrickengelbert` retained all nine objects. Its live background image
  and software resume PDF returned HTTP 200 after the final deletion.

### Final AWS state

| Resource | Final state |
| --- | --- |
| Route 53 registration `patrickengelbert.com` | Retained; auto-renew on; Cloudflare nameservers unchanged |
| S3 bucket `images-patrickengelbert` | Retained; nine objects; active production dependency |
| Amplify app `d385lcla48w64c` | Deleted |
| Amplify Gen 1 backend and owned stack resources | Deleted |
| Amplify-managed CloudFront distribution | Deleted; account distribution count zero |
| ACM validation CNAME and account certificates | Deleted/no certificates present |
| Route 53 hosted zone `Z07780862CMV5DTRBAIND` | Deleted; account hosted-zone count zero |

The AWS rollback path documented during Phase 2 is now intentionally retired.
Future production rollback or disaster recovery must use Cloudflare Pages
deployments, Git history, and the recorded DNS snapshots rather than the former
Amplify or Route 53 hosted-zone resources.

## Post-Migration DNSSEC Hardening

DNSSEC was enabled on August 21, 2026 at approximately 15:05 CDT after the AWS
retirement completed and the Cloudflare-only production architecture passed its
final checks.

| Setting | Value |
| --- | --- |
| DNSSEC signing provider | Cloudflare |
| Registrar and parent-key publisher | Route 53 Registrar |
| Key type | KSK, flags `257` |
| Algorithm | `13` (`ECDSAP256SHA256`) |
| Digest type | `2` (`SHA-256`) |
| Key tag | `2371` |
| Route 53 registrar status | `Configured` |
| Cloudflare status | Active |

Cloudflare first published the signed zone and displayed the registrar DS
details. The exact Cloudflare public key was then added through Route 53's
registrar-level **DNSSEC keys** workflow; no hosted zone was recreated. Route 53
accepted the request, initially reported the registry operation as in progress,
and then showed one configured key with matching algorithm, digest type, key
tag, and digest.

Google Public DNS and Cloudflare's resolver both returned the matching parent
`.com` DS and Cloudflare DNSKEY with the authenticated-data (`AD`) flag set.
AdGuard independently returned the same DS with `AD` set. Signed `www` address
lookups also validated through Google and Cloudflare without `SERVFAIL`.

After activation, the HTTPS apex continued to return a single `301` redirect to
the canonical `www` hostname. The homepage, portfolio, software engineering
resume, and robotics and controls resume all returned HTTP 200 from Cloudflare
Pages with SSL healthy.

DNSSEC rollback must remove the registrar key and wait for the parent DS to
expire before Cloudflare signing is disabled. Disabling Cloudflare first would
leave a stale parent DS and could make the domain fail on validating resolvers.
