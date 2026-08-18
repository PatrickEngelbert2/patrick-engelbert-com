import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getCanonicalUrl,
  getRouteMetadata,
  SITE_NAME,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_URL,
} from "./metadata.mjs";

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function updateStructuredData(structuredData) {
  const existing = document.getElementById("seo-structured-data");

  if (!structuredData) {
    existing?.remove();
    return;
  }

  const element = existing || document.createElement("script");
  element.id = "seo-structured-data";
  element.type = "application/ld+json";
  element.textContent = JSON.stringify(structuredData);

  if (!existing) {
    document.head.appendChild(element);
  }
}

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(pathname);
    const canonicalUrl = getCanonicalUrl(metadata);

    document.title = metadata.title;
    upsertMeta("name", "description", metadata.description);
    upsertMeta("name", "robots", metadata.robots);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", SOCIAL_IMAGE_URL);
    upsertMeta("property", "og:image:type", "image/png");
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", SOCIAL_IMAGE_ALT);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);
    upsertMeta("name", "twitter:image", SOCIAL_IMAGE_URL);
    upsertMeta("name", "twitter:image:alt", SOCIAL_IMAGE_ALT);

    updateStructuredData(metadata.structuredData);
  }, [pathname]);

  return null;
}

export default RouteMetadata;
