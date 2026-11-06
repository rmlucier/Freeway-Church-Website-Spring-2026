/** Calls the Flight School endpoint. Returns the parsed reply, or null on any failure. */
export async function postFlightSchool(body) {
  try {
    const response = await fetch('/api/flight-school', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}
