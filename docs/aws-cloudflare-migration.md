# AWS to Cloudflare Pages Migration

## Status

Phase 1 was audited and prepared on August 17, 2026. Production remains on AWS
Amplify and Route 53. No production DNS records or AWS resources were changed
during this phase.

The Git-connected Cloudflare Pages project is deployed and verified at
[`https://patrick-engelbert-com.pages.dev`](https://patrick-engelbert-com.pages.dev).
No custom domain has been added to the Pages project.

## Current Architecture

```text
GitHub main branch
       |
       v
AWS Amplify Hosting (build and deploy)
       |
       v
CloudFront distribution
       |
       v
Route 53 hosted zone for patrickengelbert.com
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
loads of nested routes must still be verified on the Pages preview before DNS
cutover.

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

## Cloudflare Pages Target

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
| Custom domains | None in Phase 1 |

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
| Custom domains | None |

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

## Phase 2: Zero-Downtime Cutover

1. Re-run the Route 53 record and AWS resource audits. Export a fresh DNS
   snapshot before making any change.
2. Add `patrickengelbert.com` to Cloudflare on the Free plan. Do not change the
   registrar or nameservers yet.
3. Recreate every non-NS/non-SOA Route 53 record in Cloudflare. Preserve the ACM
   validation CNAME. Temporarily point both the apex and `www` through DNS-only
   records to the existing CloudFront target so both DNS providers still serve
   AWS during nameserver propagation.
4. Compare the Cloudflare record set with the fresh Route 53 export. Pay special
   attention to any email records added after this Phase 1 audit.
5. At Route 53 Registrar, replace only the authoritative nameservers with the
   two nameservers assigned by Cloudflare.
6. Wait for the Cloudflare zone to become active and verify DNS from multiple
   resolvers. Traffic should continue reaching AWS throughout propagation.
7. Add `www.patrickengelbert.com` and `patrickengelbert.com` to the verified
   Pages project. Configure the apex-to-`www` redirect so canonical URL behavior
   matches production.
8. Replace the temporary AWS origin records with the Pages custom-domain
   records. Verify TLS, redirects, all application routes, assets, forms, and
   mobile behavior.
9. Monitor production for at least 48-72 hours. Keep Amplify and the Route 53
   hosted zone intact as rollback targets during this window.
10. After the monitoring window, disable Amplify automatic builds, remove its
    custom domain, and retire the hosting app and empty backend stack. Delete the
    Route 53 hosted zone only after Cloudflare is authoritative and stable.
11. Keep the registered domain and `images-patrickengelbert` bucket. Retire that
    S3 bucket only in a separate asset-migration project after all source URLs
    and downloadable files have been replaced and verified.

### Rollback

Before AWS decommissioning, rollback is straightforward: restore the Cloudflare
DNS records to the existing CloudFront target, or restore the Route 53
nameservers at the registrar if the issue is with Cloudflare DNS itself. Retain
the fresh Route 53 export, Amplify app, custom domain, and S3 assets until the
monitoring window has passed.
