// Vercel Serverless Function: OpenAI Responses API proxy
// Keeps OPENAI_API_KEY on server-side (set in Vercel Environment Variables)
export default async function handler(req, res) {
  // Basic CORS (allow same-origin + optional cross-origin use)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body || {}),
    });

    const text = await r.text();
    // Pass through status + JSON body (even on errors)
    res.status(r.status).setHeader("Content-Type", "application/json").send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

// Increase body size for base64 images
export const config = {
  api: {
    bodyParser: { sizeLimit: "25mb" },
  },
};
