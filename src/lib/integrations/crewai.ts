export async function runCrew(crewName: string, inputs: Record<string, unknown>) {
  const apiUrl = process.env.CREWAI_API_URL;
  const apiKey = process.env.CREWAI_API_KEY;
  if (!apiUrl) throw new Error("CrewAI not configured");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const res = await fetch(`${apiUrl}/v1/crews/${crewName}/kickoff`, {
    method: "POST",
    headers,
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) throw new Error(`CrewAI error: ${res.status}`);
  return res.json();
}

export async function getCrewStatus(crewName: string, kickoffId: string) {
  const apiUrl = process.env.CREWAI_API_URL;
  const apiKey = process.env.CREWAI_API_KEY;
  if (!apiUrl) throw new Error("CrewAI not configured");

  const headers: Record<string, string> = {};
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const res = await fetch(`${apiUrl}/v1/crews/${crewName}/status/${kickoffId}`, { headers });
  if (!res.ok) throw new Error(`CrewAI error: ${res.status}`);
  return res.json();
}

export async function scoreLeadWithAI(contactData: Record<string, unknown>) {
  return runCrew("lead-scorer", contactData);
}
