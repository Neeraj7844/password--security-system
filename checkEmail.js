// File: api/checkEmail.js
// This runs on the server (Vercel Serverless Function).
// It calls the Have I Been Pwned "breached account" API for an email.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // ---- Read email from body (works with JSON) ----
  let email;
  if (req.body) {
    if (typeof req.body === "string") {
      // If body is raw string, try to parse JSON
      try {
        const parsed = JSON.parse(req.body);
        email = parsed.email;
      } catch (e) {
        // ignore
      }
    } else if (typeof req.body === "object") {
      email = req.body.email;
    }
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required in request body." });
  }

  const apiKey = process.env.HIBP_API_KEY;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Server is missing HIBP_API_KEY environment variable." });
  }

  try {
    const url =
      "https://haveibeenpwned.com/api/v3/breachedaccount/" +
      encodeURIComponent(email) +
      "?truncateResponse=false";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "hibp-api-key": apiKey,
        "user-agent": "PasswordSecurityTool-Vercel",
      },
    });

    // 404 means: no breach found for this email
    if (response.status === 404) {
      return res.status(200).json({ breached: false, breaches: [] });
    }

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "HIBP API error", status: response.status });
    }

    const data = await response.json();
    return res.status(200).json({ breached: true, breaches: data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error contacting HIBP", details: error.message });
  }
}
