export async function makeCall(phoneNumber: string, assistantId: string) {
  const key = process.env.VAPI_API_KEY;
  if (!key) throw new Error("VAPI not configured");

  const res = await fetch("https://api.vapi.ai/call/phone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId,
      phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
      customer: { number: phoneNumber },
    }),
  });

  if (!res.ok) throw new Error(`VAPI error: ${res.status}`);
  return res.json();
}

export async function getCallTranscript(callId: string) {
  const key = process.env.VAPI_API_KEY;
  if (!key) throw new Error("VAPI not configured");

  const res = await fetch(`https://api.vapi.ai/call/${callId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  if (!res.ok) throw new Error(`VAPI error: ${res.status}`);
  return res.json();
}
