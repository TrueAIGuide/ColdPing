import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured. Add GEMINI_API_KEY to .env.local" },
      { status: 500 }
    );
  }

  try {
    const { linkedinText, product, cta, tone } = await request.json();

    if (!linkedinText || !product || !cta) {
      return NextResponse.json(
        { error: "Missing required fields: linkedinText, product, and cta" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an elite cold email copywriter. You write short, punchy, hyper-personalized cold emails that get replies.

STRICT RULES:
- Max 150 words total for the email body
- Open with ONE specific hook from their LinkedIn (a recent post, achievement, career move, or something unique about them)
- Mention one pain point specific to their role
- NEVER say "I hope this email finds you well"
- NEVER start with "My name is"
- Sound like a smart, empathetic human — not a bot or a template
- The hook must be so specific it feels deeply researched, not templated
- End with a clear, low-friction CTA
- Be concise. Every sentence must earn its place.

OUTPUT FORMAT:
Return ONLY valid JSON with exactly these two fields:
{"subject": "your subject line here", "body": "your email body here"}

Do NOT wrap in markdown code blocks. Return raw JSON only.`;

    const userPrompt = `Write a cold email using the following inputs:

LINKEDIN PROFILE INFO:
${linkedinText}

PRODUCT/SERVICE I'M SELLING:
${product}

MY DESIRED CTA:
${cta}

TONE:
${tone || "Professional"}

Remember: Return ONLY raw JSON with "subject" and "body" fields. No markdown, no code blocks.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate email. Please check your API key." },
        { status: 502 }
      );
    }

    const data = await geminiResponse.json();

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip any markdown code fences if Gemini wraps the output
    const cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/gi, "")
      .trim();

    let parsed: { subject: string; body: string };

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback: try to extract subject and body manually
      const subjectMatch = cleaned.match(/"subject"\s*:\s*"([^"]+)"/);
      const bodyMatch = cleaned.match(/"body"\s*:\s*"([\s\S]+?)"\s*}/);

      if (subjectMatch && bodyMatch) {
        parsed = {
          subject: subjectMatch[1],
          body: bodyMatch[1].replace(/\\n/g, "\n"),
        };
      } else {
        return NextResponse.json(
          {
            error: "Failed to parse AI response. Please try again.",
            raw: rawText,
          },
          { status: 500 }
        );
      }
    }

    // Calculate a simple "personalization score"
    const linkedinLower = linkedinText.toLowerCase();
    const bodyLower = parsed.body.toLowerCase();
    let score = 60; // baseline

    // Check for specific references from the profile
    const words: string[] = linkedinLower.split(/\s+/).filter((w: string) => w.length > 4);
    const uniqueWords: string[] = Array.from(new Set(words));
    const matchCount = uniqueWords.filter((w) => bodyLower.includes(w)).length;
    score += Math.min(matchCount * 2, 30);

    // Bonus for mentioning specific names/companies
    if (bodyLower.length > 50) score += 5;
    if (!bodyLower.includes("i hope")) score += 5;

    score = Math.min(score, 98);

    return NextResponse.json({
      subject: parsed.subject,
      body: parsed.body,
      score,
    });
  } catch (error) {
    console.error("Generate route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
