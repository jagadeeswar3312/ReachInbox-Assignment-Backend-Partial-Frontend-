const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export async function fetchEmails() {
  const response = await fetch(`${API_BASE_URL}/emails/fetch`);
  if (!response.ok) throw new Error(`Failed to fetch emails (${response.status})`);
  return response.json();
}

export async function analyzeEmails(webhookUrl) {
  const response = await fetch(`${API_BASE_URL}/emails/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ webhookUrl })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to analyze emails");
  return data;
}
