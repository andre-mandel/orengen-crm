export async function runCrew(crewName: string, inputs: Record<string, unknown>) {
  const apiUrl = process.env.CREWAI_API_URL;
  if (!apiUrl) throw new Error("CrewAI not configured");

  const res = await fetch(`${apiUrl}/crews/${crewName}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) throw new Error(`CrewAI error: ${res.status}`);
  return res.json();
}

export async function scoreLeadWithAI(contactData: Record<string, unknown>) {
  return runCrew("lead-scorer", contactData);
}
