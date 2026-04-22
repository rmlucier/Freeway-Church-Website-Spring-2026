import { useState } from 'react';

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
 */
export default function PhoneLink({
  mode = 'tel',
  body,
  className,
  ariaLabel,
  showNumber = false,
  children,
}) {
  const [href, setHref] = useState(null);
  const [display, setDisplay] = useState(showNumber ? '' : null);

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
      {showNumber ? display || children : children}
    </a>
  );
}
