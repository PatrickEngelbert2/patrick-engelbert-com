export const CANONICAL_ORIGIN = "https://www.patrickengelbert.com";
export const SITE_NAME = "Patrick Engelbert";
export const SOCIAL_IMAGE_URL = `${CANONICAL_ORIGIN}/social-preview.png`;
export const SOCIAL_IMAGE_ALT =
  "Patrick Engelbert, Software Engineer and Robotics & Industrial Automation professional";

export const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: `${CANONICAL_ORIGIN}/`,
    },
    {
      "@type": "Person",
      name: SITE_NAME,
      url: `${CANONICAL_ORIGIN}/`,
      sameAs: [
        "https://www.linkedin.com/in/patrick-engelbert/",
        "https://github.com/PatrickEngelbert2",
      ],
      jobTitle: "Software Engineer",
      description:
        "Software engineer with professional full-stack experience and hands-on work in robotics, controls, and industrial automation.",
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Development",
        "JavaScript",
        "TypeScript",
        "Robotics",
        "PLC Programming",
        "Industrial Automation",
        "Industrial Controls",
      ],
    },
  ],
};

export const ROUTE_METADATA = [
  {
    path: "/",
    title: "Patrick Engelbert | Software Engineer & Industrial Automation",
    description:
      "Software engineer with professional full-stack experience and hands-on work in PLC programming, robotics, controls, and industrial automation.",
    robots: "index, follow",
    sitemap: true,
    structuredData: HOME_STRUCTURED_DATA,
  },
  {
    path: "/portfolio",
    title: "Software & Automation Portfolio | Patrick Engelbert",
    description:
      "Explore Patrick Engelbert's software engineering portfolio, including full-stack applications, application architecture, and technical projects.",
    robots: "index, follow",
    sitemap: true,
  },
  {
    path: "/resume/software-engineering",
    title: "Software Engineering Resume | Patrick Engelbert",
    description:
      "Software engineering resume for Patrick Engelbert, covering professional full-stack experience, JavaScript, TypeScript, Angular, React, Node.js, and related technologies.",
    robots: "index, follow",
    sitemap: true,
  },
  {
    path: "/resume/robotics-controls",
    title: "Robotics & Controls Resume | Patrick Engelbert",
    description:
      "Robotics and industrial controls resume for Patrick Engelbert, covering PLC programming, FANUC and Universal Robots, industrial automation, sensors, VFDs, and control systems.",
    robots: "index, follow",
    sitemap: true,
  },
  {
    path: "/contact",
    title: "Contact Patrick Engelbert | Software & Automation",
    description:
      "Contact Patrick Engelbert regarding software engineering, robotics, controls, industrial automation, and related opportunities.",
    robots: "index, follow",
    sitemap: true,
  },
  {
    path: "/bio",
    title: "About Patrick Engelbert | Career Journey",
    description:
      "A brief introduction to Patrick Engelbert's path into software engineering, robotics, and industrial automation.",
    robots: "noindex, follow",
  },
  {
    path: "/experience",
    title: "Professional Experience | Patrick Engelbert",
    description:
      "Find Patrick Engelbert's professional background through his software engineering resume, robotics and controls resume, and portfolio.",
    robots: "noindex, follow",
  },
  {
    path: "/contact/message",
    title: "Send a Message | Patrick Engelbert",
    description: "Send a professional message to Patrick Engelbert.",
    robots: "noindex, follow",
  },
  {
    path: "/contact/request-contact-info",
    title: "Request Contact Information | Patrick Engelbert",
    description: "Request Patrick Engelbert's professional contact information.",
    robots: "noindex, follow",
  },
  {
    path: "/spacex",
    title: "SpaceX Mission Brief | Patrick Engelbert",
    description:
      "A hidden mission brief presenting Patrick Engelbert's software, controls, and automation experience.",
    robots: "noindex, nofollow",
  },
  {
    path: "/resume",
    canonicalPath: "/resume/software-engineering",
    title: "Software Engineering Resume | Patrick Engelbert",
    description:
      "Software engineering resume for Patrick Engelbert, covering professional full-stack experience and related technologies.",
    robots: "noindex, follow",
  },
];

const NOT_FOUND_METADATA = {
  title: "Page Not Found | Patrick Engelbert",
  description: "The requested page could not be found on Patrick Engelbert's portfolio website.",
  robots: "noindex, follow",
};

export function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return `/${pathname.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "")}`;
}

export function getRouteMetadata(pathname) {
  const path = normalizePath(pathname);
  return (
    ROUTE_METADATA.find((route) => route.path === path) || {
      ...NOT_FOUND_METADATA,
      path,
    }
  );
}

export function getCanonicalUrl(metadata) {
  const path = metadata.canonicalPath || metadata.path;
  return path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
}
