import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getCanonicalUrl,
  ROUTE_METADATA,
  SOCIAL_IMAGE_URL,
} from "../src/seo/metadata.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDirectory = path.join(projectRoot, "build");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function routeOutputPath(routePath) {
  return routePath === "/"
    ? path.join(buildDirectory, "index.html")
    : path.join(buildDirectory, `${routePath.slice(1)}.html`);
}

for (const metadata of ROUTE_METADATA) {
  const html = await readFile(routeOutputPath(metadata.path), "utf8");
  const canonicalUrl = getCanonicalUrl(metadata);
  const escapedDescription = metadata.description
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  assert(html.includes(`<title>${metadata.title.replaceAll("&", "&amp;")}</title>`), `${metadata.path}: title is missing`);
  assert(
    html.includes(`name="description" content="${escapedDescription}"`),
    `${metadata.path}: description is incorrect`
  );
  assert(html.includes(`content="${metadata.robots}"`), `${metadata.path}: robots directive is incorrect`);
  assert(html.includes(`rel="canonical" href="${canonicalUrl}"`), `${metadata.path}: canonical URL is incorrect`);
  assert(html.includes(`property="og:url" content="${canonicalUrl}"`), `${metadata.path}: Open Graph URL is incorrect`);
  assert(html.includes(`property="og:image" content="${SOCIAL_IMAGE_URL}"`), `${metadata.path}: Open Graph image is missing`);
  assert(html.includes(`name="twitter:card" content="summary_large_image"`), `${metadata.path}: Twitter card is missing`);
  assert(!html.includes("pages.dev"), `${metadata.path}: contains a Pages preview URL`);
  assert(!html.includes('href="https://patrickengelbert.com'), `${metadata.path}: contains a non-www canonical URL`);

  if (metadata.path === "/") {
    assert(html.includes('type="application/ld+json"'), "Homepage JSON-LD is missing");
  } else {
    assert(!html.includes('type="application/ld+json"'), `${metadata.path}: homepage JSON-LD should not be present`);
  }
}

const robots = await readFile(path.join(buildDirectory, "robots.txt"), "utf8");
assert(robots.includes("User-agent: *"), "robots.txt does not address all crawlers");
assert(robots.includes("Allow: /"), "robots.txt does not allow normal crawling");
assert(
  robots.includes("Sitemap: https://www.patrickengelbert.com/sitemap.xml"),
  "robots.txt does not identify the canonical sitemap"
);

const sitemap = await readFile(path.join(buildDirectory, "sitemap.xml"), "utf8");
const sitemapRoutes = ROUTE_METADATA.filter((metadata) => metadata.sitemap);
for (const metadata of sitemapRoutes) {
  assert(sitemap.includes(`<loc>${getCanonicalUrl(metadata)}</loc>`), `${metadata.path}: missing from sitemap`);
}
for (const metadata of ROUTE_METADATA.filter((route) => !route.sitemap)) {
  const routeUrl = `https://www.patrickengelbert.com${metadata.path}`;
  assert(!sitemap.includes(`<loc>${routeUrl}</loc>`), `${metadata.path}: noindex route appears in sitemap`);
}

const socialImage = await readFile(path.join(buildDirectory, "social-preview.png"));
assert(socialImage.toString("ascii", 1, 4) === "PNG", "Social preview is not a PNG");
assert(socialImage.readUInt32BE(16) === 1200, "Social preview width is not 1200px");
assert(socialImage.readUInt32BE(20) === 630, "Social preview height is not 630px");

console.log(`Validated metadata for ${ROUTE_METADATA.length} paths, robots.txt, sitemap.xml, and social preview.`);
