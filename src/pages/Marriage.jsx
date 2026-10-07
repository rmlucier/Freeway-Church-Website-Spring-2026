import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, MotionConfig } from 'framer-motion';
import SEO from '../components/SEO.jsx';

// Planning Center registration link — swap in the real URL before sharing.
const REGISTER_URL = 'https://freewaychurch.churchcenter.com/registrations/events/3946623';

// Registration closes at the end of Wednesday, Nov 4, 2026 in Albion
// (America/Detroit). DST ends Nov 1, so that's EST (UTC-5). Checked in the
// browser at render time — no backend needed.
const REGISTRATION_CLOSES = new Date('2026-11-05T00:00:00-05:00');

const SITE_URL = 'https://freeway.church';
const HERO_IMAGE = '/images/marriage/hero.jpg';
const PRESENTER_IMAGE = '/images/marriage/chris.jpg';
const PATHWAY_URL = 'https://pathwaycoaching.org/couples.html';

const ADDRESS = '28900 B Drive North, Albion, MI 49224';
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Freeway Church, ${ADDRESS}`
)}`;

const TITLE = 'Marriage Night at Freeway | November 7';
const DESCRIPTION =
  'A free one-evening marriage workshop at Freeway Church in Albion. Pizza dinner, Saturday, November 7, 6:00-8:30 p.m.';

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Marriage Night at Freeway',
  description: DESCRIPTION,
  startDate: '2026-11-07T18:00:00-05:00',
  endDate: '2026-11-07T20:30:00-05:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  maximumAttendeeCapacity: 40,
  typicalAgeRange: '18-',
  image: [`${SITE_URL}${HERO_IMAGE}`],
  url: `${SITE_URL}/marriage`,
  location: {
    '@type': 'Place',
    name: 'Freeway Church',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28900 B Drive North',
      addressLocality: 'Albion',
      addressRegion: 'MI',
      postalCode: '49224',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Freeway Church',
    url: SITE_URL,
  },
  performer: {
    '@type': 'Person',
    name: 'Chris Cowling',
    affiliation: { '@type': 'Organization', name: 'Pathway Coaching' },
    url: PATHWAY_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: REGISTER_URL,
    validThrough: '2026-11-04T23:59:00-05:00',
  },
};

const couplePhotos = [
  {
    src: '/images/marriage/couple-3.jpg',
    alt: 'An older couple sitting close together at a church dinner table',
  },
  {
    src: '/images/marriage/couple-1.jpg',
    alt: 'A smiling couple in ball caps sharing a hug outdoors',
  },
  {
    src: '/images/marriage/couple-2.jpg',
    alt: 'A young couple standing arm in arm on a lawn at an outdoor gathering',
  },
];

const takeaways = [
  'A common language for honest, open conversation',
  'A clearer picture of what blocks your communication',
  'One real conversation, already started',
];

const EASE = [0.2, 0.8, 0.2, 1];

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const reveal = {
  variants: revealUp,
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-100px' },
};

// Primary CTA. Past the deadline it turns into plain text, so nobody lands on
// a closed form.
function RegisterButton({ closed }) {
  if (closed) {
    return (
      <p className="font-display font-bold uppercase tracking-widest2 text-sm text-fc-gold-soft">
        Registration is closed
      </p>
    );
  }
  return (
    <a href={REGISTER_URL} className="btn-primary">
      Register
    </a>
  );
}

// Image that quietly removes itself if the file isn't there yet, so the
// container's solid background shows instead of a broken-image icon.
function OptionalImage({ src, alt, className, onMissing, ...rest }) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setMissing(true);
        onMissing?.();
      }}
      {...rest}
    />
  );
}

function PresenterPhoto() {
  const [missing, setMissing] = useState(false);
  return (
    <div className="relative h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-full bg-fc-teal-dark border border-fc-cream/15">
      {missing && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display font-black text-4xl text-fc-cream"
        >
          CC
        </span>
      )}
      <OptionalImage
        src={PRESENTER_IMAGE}
        alt="Chris Cowling"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        width="256"
        height="256"
        onMissing={() => setMissing(true)}
      />
    </div>
  );
}

export default function Marriage() {
  const closed = Date.now() >= REGISTRATION_CLOSES.getTime();

  return (
    <MotionConfig reducedMotion="user">
      <main className="pt-20">
        <SEO
          path="/marriage"
          title={TITLE}
          titleSuffix={false}
          description={DESCRIPTION}
          image={`${SITE_URL}${HERO_IMAGE}`}
        />
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
        </Helmet>

        {/* 1. Hero — solid brand background if the photo isn't in place yet */}
        <section className="relative overflow-hidden bg-fc-black">
          <OptionalImage
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[60%_50%]"
            fetchpriority="high"
          />
          {/* Heavier wash on phones (text covers the whole photo); on desktop it
              opens up to the right so the photo reads behind the headline. */}
          <div className="absolute inset-0 bg-fc-black/75 md:bg-transparent md:bg-gradient-to-r md:from-fc-black md:via-fc-black/75 md:to-fc-black/20" />
          <div className="container-fc relative py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="max-w-3xl"
            >
              <img
                src="/images/marriage/know-honesty-logo.png"
                alt="Know Honesty"
                width="524"
                height="246"
                className="h-12 md:h-16 w-auto mb-8"
              />
              <p className="eyebrow mb-6">Saturday, November 7 &middot; 6:00&ndash;8:30 p.m.</p>
              <h1 className="display-xl text-5xl md:text-8xl leading-[0.85] pb-[0.12em] text-fc-cream">
                Marriage Night<br />
                <span className="text-fc-teal">at Freeway</span>
              </h1>
              <p className="mt-6 text-xl md:text-3xl text-fc-cream/90 leading-tight font-display font-medium">
                A Know Honesty workshop with Chris Cowling
              </p>
              <p className="mt-6 font-display uppercase tracking-widest2 text-sm md:text-base text-fc-cream/85">
                Free &middot; Pizza dinner &middot; Adults only
              </p>
              <div className="mt-9">
                <RegisterButton closed={closed} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Body copy */}
        <section className="py-20 md:py-28 bg-fc-black border-t border-fc-cream/10">
          <div className="container-fc">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="eyebrow mb-6">One Evening, Just the Two of You</p>
              <div className="space-y-6 text-fc-cream/80 text-lg leading-relaxed">
                <p>
                  Nobody sat you down and taught you how to talk to each other. You picked
                  it up from your parents, from old relationships, from whatever worked
                  last time. Most couples are winging it.
                </p>
                <p>
                  Marriage Night is one evening to fix that. Chris Cowling of Pathway
                  Coaching has worked with couples for over 25 years, and he&apos;ll walk us
                  through the Know Honesty model: a simple, shared way to be fully honest
                  and fully open with each other.
                </p>
                <p>
                  This is a workshop, not a lecture. You&apos;ll learn the model over dinner,
                  then use it right there, just the two of you, on one real area of your
                  life. No sharing with the group. No counseling. It&apos;s for newlyweds,
                  couples 30 years in, and everyone between.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl"
            >
              {couplePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`relative aspect-[3/2] overflow-hidden ${i === 0 ? 'col-span-2 md:col-span-1' : ''} border border-fc-cream/10 bg-fc-black-soft`}
                >
                  <OptionalImage
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width="640"
                    height="427"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Takeaways */}
        <section className="py-20 md:py-28 bg-fc-black-soft border-t border-fc-cream/10">
          <div className="container-fc">
            <motion.div {...reveal} className="max-w-3xl">
              <h2 className="display-xl text-4xl md:text-6xl mb-10">
                You&apos;ll leave <span className="text-fc-teal">with</span>
              </h2>
              <ul className="border-t border-fc-cream/10">
                {takeaways.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 py-5 border-b border-fc-cream/10 text-lg text-fc-cream/90"
                  >
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-fc-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 4. Details + 5. Double-date callout */}
        <section className="py-20 md:py-28 bg-fc-black border-t border-fc-cream/10">
          <div className="container-fc">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="eyebrow mb-6">The Details</p>
              <h2 className="display-xl text-4xl md:text-6xl mb-10 pb-[0.12em]">
                When &amp; <span className="text-fc-gold">where</span>
              </h2>
              <dl className="border-t border-l border-fc-cream/10 grid sm:grid-cols-2">
                {[
                  ['Date', 'Saturday, November 7, 2026'],
                  ['Time', '6:00–8:30 p.m.'],
                  ['Cost', 'Free'],
                  ['Dinner', 'Pizza dinner included'],
                ].map(([label, value]) => (
                  <div key={label} className="p-6 md:p-8 border-r border-b border-fc-cream/10">
                    <dt className="font-display font-black uppercase text-lg text-fc-teal mb-2">
                      {label}
                    </dt>
                    <dd className="text-fc-cream/85">{value}</dd>
                  </div>
                ))}
                <div className="p-6 md:p-8 border-r border-b border-fc-cream/10 sm:col-span-2">
                  <dt className="font-display font-black uppercase text-lg text-fc-teal mb-2">
                    Location
                  </dt>
                  <dd className="text-fc-cream/85">
                    Freeway Church
                    <br />
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-fc-teal transition-colors"
                    >
                      {ADDRESS}
                      <span className="sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-8 text-fc-cream/75 leading-relaxed">
                <strong className="text-fc-cream">Adults only.</strong> No childcare is
                provided, so grab a sitter and make it a date night.
              </p>

              <aside className="mt-12 border-l-4 border-fc-gold bg-fc-gold/10 p-6 md:p-8">
                <p className="font-display font-black uppercase text-2xl md:text-3xl leading-tight text-fc-cream">
                  Make it a double date.
                </p>
                <p className="mt-3 text-fc-cream/85 leading-relaxed">
                  Freeway couples and friends are welcome, so bring another couple with you.
                </p>
              </aside>
            </motion.div>
          </div>
        </section>

        {/* 6. Presenter */}
        <section className="py-20 md:py-28 bg-fc-black-soft border-t border-fc-cream/10">
          <div className="container-fc">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="eyebrow !text-fc-gold-soft mb-6">Your Host</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
                <PresenterPhoto />
                <div>
                  <h2 className="display-xl text-4xl md:text-5xl">Chris Cowling</h2>
                  <p className="mt-2 flex items-center gap-3 font-display uppercase tracking-widest2 text-sm text-fc-gold-soft">
                    <img
                      src="/images/marriage/pathway-logo.png"
                      alt=""
                      width="160"
                      height="160"
                      loading="lazy"
                      className="h-10 w-10"
                    />
                    Pathway Coaching
                  </p>
                  <p className="mt-4 text-fc-cream/80 leading-relaxed">
                    Chris has spent more than 25 years working with couples.
                  </p>
                  <a
                    href={PATHWAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-display uppercase tracking-widest2 text-xs text-fc-gold-soft hover:text-fc-cream transition-colors"
                  >
                    More about Pathway Coaching →
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. Closing CTA */}
        <section
          id="register"
          className="relative overflow-hidden py-20 md:py-28 bg-fc-black border-t border-fc-cream/10"
        >
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-fc-teal/15 blur-3xl" />
          <div className="container-fc relative">
            <motion.div {...reveal} className="max-w-3xl">
              <h2 className="display-xl text-4xl md:text-6xl mb-8">
                Save your <span className="text-fc-teal">seats</span>
              </h2>
              <p className="text-fc-cream/80 text-lg leading-relaxed mb-10">
                Space is limited to 20 couples. Register by Wednesday, November 4.
              </p>
              <RegisterButton closed={closed} />
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
