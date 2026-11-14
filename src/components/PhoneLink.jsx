import { useEffect, useState } from 'react';

// Phone number is never rendered as one contiguous string in source. Harvesters
// that scrape the page HTML or bundle find three fragments that look like junk.
// Assembled only when the user hovers/focuses/taps the link.
const PARTS = ['517', '798', '0571'];
const buildNumber = () => `${PARTS[0]}-${PARTS[1]}-${PARTS[2]}`;
const buildTelHref = () => `tel:+1${PARTS[0]}${PARTS[1]}${PARTS[2]}`;
const buildSmsHref = (body) => {
  const params = body ? `?&body=${encodeURIComponent(body)}` : '';
  return `sms:+1${PARTS[0]}${PARTS[1]}${PARTS[2]}${params}`;
};

/**
 * Scrape-resistant phone link.
 *
 * Pass `mode="sms"` for text-message intent (opens the user's messages app
 * with Pastor Roy's number prefilled). Default is `tel` which initiates a
 * call on mobile and opens a call-handler on desktop.
 *
 * If `showNumber` is true, the visible number text is also assembled only
 * at interaction time — until then it renders as the children content.
 *
 * If `visible` is true, the number is shown as the link text as soon as the
 * page is running in a browser. It is still assembled from fragments in the
 * browser, so it never appears in the page's HTML source.
 */
export default function PhoneLink({
  mode = 'tel',
  body,
  className,
  ariaLabel,
  showNumber = false,
  visible = false,
  children,
}) {
  const [href, setHref] = useState(null);
  const [display, setDisplay] = useState(showNumber ? '' : null);

  useEffect(() => {
    if (visible) setDisplay(buildNumber());
  }, [visible]);

  const prepare = () => {
    if (!href) {
      setHref(mode === 'sms' ? buildSmsHref(body) : buildTelHref());
    }
    if (showNumber && !display) {
      setDisplay(buildNumber());
    }
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
        if (!href) {
          e.preventDefault();
          const target = mode === 'sms' ? buildSmsHref(body) : buildTelHref();
          window.location.href = target;
        }
      }}
    >
      {showNumber || visible ? display || children : children}
    </a>
  );
}
