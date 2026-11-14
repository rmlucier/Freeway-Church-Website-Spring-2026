import { useEffect, useState } from 'react';

// The address is never stored or rendered as a contiguous string.
// It gets assembled on user interaction — hover, focus, touch, or click —
// which defeats the overwhelming majority of email harvesters that scrape
// static HTML and bundled JS for literal "@" patterns.
const PARTS = ['info', 'freeway', 'church'];
const buildAddress = (parts) => `${parts[0]}@${parts[1]}.${parts[2]}`;
const buildHref = (subject, parts) => {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${buildAddress(parts)}${params}`;
};

// Pass `showAddress` to show the address itself as the link text. It is put
// together in the browser after the page loads, so it still never appears in
// the page's HTML source; until then the children are shown.
export default function MailLink({
  subject,
  children,
  className,
  ariaLabel,
  parts = PARTS,
  showAddress = false,
}) {
  const [href, setHref] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (showAddress) setAddress(buildAddress(parts));
  }, [showAddress, parts]);

  const prepare = () => {
    if (href) return;
    setHref(buildHref(subject, parts));
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
          window.location.href = buildHref(subject, parts);
        }
      }}
    >
      {address || children}
    </a>
  );
}
