export async function triggerWorkflow(webhookPath: string, data: Record<string, unknown>) {
  const baseUrl = process.env.N8N_WEBHOOK_URL || "https://automate.orengen.io/webhook";

  const res = await fetch(`${baseUrl}/${webhookPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`n8n webhook error: ${res.status}`);
  return res.json();
}
