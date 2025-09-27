import { NextResponse } from "next/server";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export const VOICE_IDS = {
  Rachel: "21m00Tcm4TlvDq8ikWAM",
  Adam: "pNInz6obpgDQGcFmaJgB",
  Bella: "EXAVITQu4vr4xnSDxMdl",
  Domi: "AZnzlk1XvdvUeBnXmlld",
  Elli: "MF3mGyEYCl7XYWbV9V6O",
  Josh: "TxGEqnHWrfWFTfGW9XjX",
  Charlie: "IKne3meq5aSn9XLyUdCD",
  Freddie: "JSynzYvQnZrPjUn8j4EY",
};

export async function POST(req) {
  try {
    const { text, voice = "Rachel", voice_settings } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const voiceId = VOICE_IDS[voice] || VOICE_IDS.Rachel;

    // Debug bilgileri
    console.log("Voice selected:", voice);
    console.log("Voice ID:", voiceId);
    console.log("API Key exists:", !!ELEVENLABS_API_KEY);

    const defaultVoiceSettings = {
      stability: 0.5,
      similarity_boost: 0.75,
    };

    const finalVoiceSettings = voice_settings || defaultVoiceSettings;

    const response = await fetch(`${API_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: finalVoiceSettings,
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
