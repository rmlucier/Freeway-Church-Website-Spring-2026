import { Helmet } from 'react-helmet-async';
import { CHRISTMAS_EVE_TIME } from './config.js';
import './wonder.css';

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '28900 B Dr N',
  addressLocality: 'Albion',
  addressRegion: 'MI',
  postalCode: '49224',
  addressCountry: 'US',
};

// Christmas Eve as a schema.org Event, so searches like "Christmas Eve service
// Albion" can show it. Lives here (not in index.html) so it disappears with
// the rest of Wonder. Update the times if CHRISTMAS_EVE_TIME changes.
const CHRISTMAS_EVE_EVENT = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Christmas Eve at Freeway Church',
  description: `A Christmas Eve service at Freeway Church in Albion, Michigan, ${CHRISTMAS_EVE_TIME}. Part of Wonder, a five-week Christmas series. Everyone is welcome.`,
  startDate: '2026-12-24T17:00:00-05:00',
  endDate: '2026-12-24T18:00:00-05:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  image: 'https://www.freeway.church/images/wonder/wonder-hero-1920.webp',
  url: 'https://www.freeway.church/#christmas-eve',
  location: { '@type': 'Place', name: 'Freeway Church', address: ADDRESS },
  organizer: { '@type': 'Church', name: 'Freeway Church', url: 'https://www.freeway.church' },
};

// Wonder fonts and the Christmas Eve event. Only rendered while Wonder is on,
// so the site loads none of this the rest of the year. (preconnect to Google
// Fonts is already in index.html.)
export default function WonderHead() {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700;800&family=Pacifico&display=swap"
      />
      <script type="application/ld+json">{JSON.stringify(CHRISTMAS_EVE_EVENT)}</script>
    </Helmet>
  );
}
