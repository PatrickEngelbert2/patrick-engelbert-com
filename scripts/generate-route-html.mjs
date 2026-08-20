import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getCanonicalUrl,
  ROUTE_METADATA,
  SITE_NAME,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_URL,
} from "../src/seo/metadata.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDirectory = path.join(projectRoot, "build");
const templatePath = path.join(buildDirectory, "index.html");
const startMarker = "<!-- SEO:START -->";
const endMarker = "<!-- SEO:END -->";
const homePreloadPattern =
  /\s*<!-- HOME-PRELOAD:START -->[\s\S]*?<!-- HOME-PRELOAD:END -->/;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderMetadata(metadata) {
  const canonicalUrl = getCanonicalUrl(metadata);
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const imageAlt = escapeHtml(SOCIAL_IMAGE_ALT);
  const structuredData = metadata.structuredData
    ? `\n    <script id="seo-structured-data" type="application/ld+json">${JSON.stringify(
        metadata.structuredData
      ).replaceAll("<", "\\u003c")}</script>`
    : "";

  return `${startMarker}
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${metadata.robots}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${SOCIAL_IMAGE_URL}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${imageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SOCIAL_IMAGE_URL}" />
    <meta name="twitter:image:alt" content="${imageAlt}" />${structuredData}
    ${endMarker}`;
}

const template = await readFile(templatePath, "utf8");
const markerPattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);

if (!markerPattern.test(template)) {
  throw new Error("The built index.html does not contain the SEO marker block.");
}

for (const metadata of ROUTE_METADATA) {
  const outputPath =
    metadata.path === "/"
      ? templatePath
      : path.join(buildDirectory, `${metadata.path.slice(1)}.html`);
  let routeHtml = template.replace(markerPattern, renderMetadata(metadata));

  if (metadata.path !== "/") {
    routeHtml = routeHtml.replace(homePreloadPattern, "");
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, routeHtml);
}

console.log(`Generated route metadata for ${ROUTE_METADATA.length} paths.`);
