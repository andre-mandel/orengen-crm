export async function getBookings() {
  const key = process.env.CALCOM_API_KEY;
  const baseUrl = process.env.CALCOM_URL || "https://api.cal.com/v2";
  if (!key) throw new Error("Cal.com not configured");

  const res = await fetch(`${baseUrl}/bookings`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`Cal.com error: ${res.status}`);
  return res.json();
}

export async function handleBookingWebhook(payload: Record<string, unknown>) {
  return {
    type: payload.triggerEvent,
    booking: payload.payload,
  };
}
