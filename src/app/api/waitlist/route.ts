import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formspreeId = process.env.FORMSPREE_ID;

  if (!formspreeId) {
    return NextResponse.json(
      { error: "Formspree ID not configured" },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const formspreeUrl = formspreeId.startsWith("http")
      ? formspreeId
      : `https://formspree.io/f/${formspreeId}`;

    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Something went wrong. Try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
