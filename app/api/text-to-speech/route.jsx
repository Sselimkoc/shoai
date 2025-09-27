import { NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

const VOICE_IDS = {
  Rachel: "21m00Tcm4TlvDq8ikWAM",
  Doga: "IuRRIAcbQK5AQk1XevPj",
  Alice: "Xb7hH8MSUJpSbSDYk0k2",
  Charlie: "IZ09Gt5U8VtP9GJWjK07",
  Freddie: "21m00Tcm4TlvDq8ikWAM",
  Erin: "21m00Tcm4TlvDq8ikWAM",
  Sarah: "21m00Tcm4TlvDq8ikWAM",
  Ella: "21m00Tcm4TlvDq8ikWAM",
  Emily: "21m00Tcm4TlvDq8ikWAM",
};

export async function POST(req) {
  try {
    const { text, voice = "Rachel" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const voiceId = VOICE_IDS[voice] || VOICE_IDS.Rachel;

    const response = await fetch(`${API_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({ audio: base64Audio });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
