import { useState } from 'react';

// The address is never stored or rendered as a contiguous string.
// It gets assembled on user interaction — hover, focus, touch, or click —
// which defeats the overwhelming majority of email harvesters that scrape
// static HTML and bundled JS for literal "@" patterns.
const PARTS = ['info', 'freeway', 'church'];
const buildAddress = () => `${PARTS[0]}@${PARTS[1]}.${PARTS[2]}`;
const buildHref = (subject) => {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${buildAddress()}${params}`;
};

export default function MailLink({ subject, children, className, ariaLabel }) {
  const [href, setHref] = useState(null);

  const prepare = () => {
    if (href) return;
    setHref(buildHref(subject));
  };

  return (
    <a
      href={href || '#'}
      className={className}
      rel="nofollow"
      aria-label={ariaLabel}
      onMouseEnter={prepare}
      onFocus={prepare}
      onTouchStart={prepare}
      onClick={(e) => {
        // Fallback for users who click before hover fires (e.g. keyboard,
        // some mobile browsers). Construct and navigate on the fly.
        if (!href) {
          e.preventDefault();
          window.location.href = buildHref(subject);
        }
      }}
    >
      {children}
    </a>
  );
}
