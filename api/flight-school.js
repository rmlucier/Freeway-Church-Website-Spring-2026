// Flight School server endpoint. Runs on Vercel, same origin as the site.
//
//   finish: records that someone finished, then emails them their private link.
//   pastor: returns who finished, for the pastor view.
//
// The results link passes through here only to be emailed. It is never stored.

const SITE_LOG_PATH = '/flight-school/log#';
const ALLOWED_HOSTS = ['https://www.freeway.church', 'https://freeway.church'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LINK = 4000;

async function rpc(name, args) {
  const url = process.env.FS_SUPABASE_URL;
  const key = process.env.FS_SUPABASE_KEY;
  if (!url || !key) throw new Error('database not configured');
  return fetch(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
}

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Only links back to our own results page, so this can't relay other content.
const isOurLink = (link) =>
  typeof link === 'string' &&
  link.length <= MAX_LINK &&
  ALLOWED_HOSTS.some((host) => link.startsWith(`${host}${SITE_LOG_PATH}`));

async function sendResultsEmail({ to, name, link }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.FS_EMAIL_FROM || 'Freeway Church <info@freeway.church>',
      to: [to],
      subject: 'Your Preflight Results',
      text: `Hi ${name},\n\nThanks for taking Flight School. Here is your private results link:\n\n${link}\n\nAnyone with this link can see your results, so choose who gets it.\n\nFreeway Church`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for taking Flight School. Here is your private results link:</p><p><a href="${escapeHtml(link)}">Open Your Preflight Results</a></p><p>Anyone with this link can see your results, so choose who gets it.</p><p>Freeway Church</p>`,
    }),
  });
  return response.ok;
}

async function finish(body, res) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!name || name.length > 120 || email.length > 254) {
    return res.status(400).json({ error: 'invalid' });
  }
  const validEmail = EMAIL_PATTERN.test(email);

  const saved = await rpc('flight_school_record_finish', {
    p_name: name,
    p_helpers: '', // No longer collected. The column stays for rows saved before.
    p_email: validEmail ? email : '',
  });
  if (!saved.ok) return res.status(502).json({ error: 'not saved' });
  const result = await saved.json();
  if (!result.saved) return res.status(429).json({ error: 'busy' });

  let emailed = false;
  if (validEmail && result.mayEmail && isOurLink(body.link)) {
    try {
      emailed = await sendResultsEmail({ to: email, name, link: body.link });
    } catch {
      emailed = false; // The finish is saved. They still have the Email Me button.
    }
  }
  return res.status(200).json({ saved: true, emailed });
}

async function pastor(body, res) {
  if (typeof body.key !== 'string' || body.key.length > 200) {
    return res.status(403).json({ error: 'not allowed' });
  }
  const list = await rpc('flight_school_pastor_list', { p_key: body.key });
  if (!list.ok) return res.status(403).json({ error: 'not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ finishes: await list.json() });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  try {
    if (body.action === 'finish') return await finish(body, res);
    if (body.action === 'pastor') return await pastor(body, res);
    return res.status(400).json({ error: 'unknown action' });
  } catch (error) {
    console.error('flight-school api', error.message);
    return res.status(500).json({ error: 'server error' });
  }
}
