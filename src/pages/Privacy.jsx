import SEO from '../components/SEO.jsx';
import MailLink from '../components/MailLink.jsx';

const sections = [
  {
    title: 'Flight School',
    body: [
      'When you finish, we save the name you enter and the time you finished, so our pastors can see who has completed it. We keep that until you ask us to remove it.',
      'If you enter an email, we use it to send your results link when email sending is turned on. We do not save the address itself. We keep a one-way code made from it to limit repeat emails, and clear it after about a day as later finishes come in.',
      'Your answers and scores stay in your own browser and in the results link. Anyone you give that link to can see them.',
    ],
  },
  {
    title: 'Giving, forms and the newsletter',
    body: [
      'These happen on Church Center (Planning Center), under its own privacy policy. Card details never pass through this website.',
    ],
  },
  {
    title: 'Other services',
    body: [
      'Vercel hosts this site, keeps standard server logs, and counts page visits and speed without cookies. Fonts, maps and videos come from Google and YouTube, which receive your IP address when they load.',
      'We do not sell your information or use advertising trackers.',
    ],
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-fc-black">
      <SEO
        path="/privacy"
        title="Privacy"
        description="What Freeway Church collects on freeway.church, why, and how to have it removed."
      />
      <div className="container-fc">
        <div className="max-w-2xl">
          <h1 className="display-xl text-6xl md:text-8xl leading-[0.9] mb-10">Privacy</h1>
          {sections.map((s) => (
            <section key={s.title} className="mb-10">
              <h2 className="font-display font-black uppercase text-2xl mb-4">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="text-fc-cream/80 text-lg leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <section>
            <h2 className="font-display font-black uppercase text-2xl mb-4">Your information</h2>
            <p className="text-fc-cream/80 text-lg leading-relaxed mb-4">
              To see or remove anything we have saved about you, email us:
            </p>
            <MailLink
              showAddress
              ariaLabel="Email Freeway Church"
              className="font-display tracking-wide text-fc-cream underline"
            >
              Email Us
            </MailLink>
            <p className="text-fc-cream/80 mt-10">Last updated: November 2026.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
