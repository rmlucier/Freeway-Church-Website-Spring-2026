import { Helmet } from 'react-helmet-async';

/**
 * Emits FAQPage structured data for a page's Q&A list.
 *
 * When Google's crawler recognizes this, the FAQs become eligible for
 * the expandable-questions rich result directly under your search
 * listing — a large visual boost in search.
 *
 * `items` is an array of { q: string, a: string } objects. If your
 * rendered answer contains links or other React nodes, pass the plain
 * text equivalent here — Google wants a clean string.
 */
export default function FAQSchema({ items }) {
  if (!items?.length) return null;

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(payload)}</script>
    </Helmet>
  );
}
