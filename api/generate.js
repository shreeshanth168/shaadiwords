export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { names, event, tone, lang, date, details } = req.body || {};

  if (!names || !names.trim()) {
    return res.status(400).json({ error: "Please enter the couple's names." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is not configured yet (missing API key).' });
  }

  const prompt = `You are an expert Indian wedding invitation writer. Write wedding-related text for the following:

Couple / Names: ${names}
Event type: ${event || 'Wedding'}
Tone: ${tone || 'Traditional'}
Language style: ${lang || 'English'}
Date & City: ${date || 'not specified'}
Extra details: ${details || 'none'}

Return ONLY a valid JSON object with exactly these three keys, no markdown, no code fences, no extra commentary:
{
  "invitation": "a formal, warm wedding invitation wording, 3-5 sentences, suitable for a printed card",
  "whatsapp": "a short, warm message (2-3 sentences) suitable to send on WhatsApp to invite friends and family",
  "instagram": "a short, catchy Instagram caption (1-2 sentences) with 3-5 relevant hashtags at the end"
}

If "Language style" mentions a mix (e.g. Hindi + English), naturally blend a few common phrases from that language using Latin script, while keeping it easy to read. Do not use markdown formatting like asterisks or headers inside the text values.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'The AI service is temporarily unavailable. Please try again in a moment.' });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Could not generate wording. Please try again.' });
    }

    let parsed;
    try {
      const cleaned = rawText.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('Parse error:', rawText);
      return res.status(502).json({ error: 'Something went wrong formatting the result. Please try again.' });
    }

    return res.status(200).json({
      invitation: parsed.invitation || '',
      whatsapp: parsed.whatsapp || '',
      instagram: parsed.instagram || ''
    });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
