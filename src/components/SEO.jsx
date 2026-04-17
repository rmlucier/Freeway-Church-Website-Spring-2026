import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://freeway.church';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Per-page SEO metadata.
 *
 * Sets <title>, <meta description>, canonical URL, and the Open Graph /
 * Twitter Card tags that control how links look when pasted into Facebook,
 * iMessage, Slack, etc.
 *
 * Google and modern crawlers execute the JS on this SPA and see these tags
 * per route; older scrapers see whatever is static in index.html.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${path}`;
  // The title ends with the site name for brand recognition in search results,
  // except on the home page which gets a cleaner treatment.
  const fullTitle = path === '/' ? title : `${title} | Freeway Church`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph (Facebook, LinkedIn, iMessage, most everything) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Freeway Church" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
