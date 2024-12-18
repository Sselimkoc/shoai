import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received prompt:", prompt);

    // Sending the prompt to Google Generative AI model
    const result = await chatSession.sendMessage(prompt);

    // Check the response and format it as needed
    const responseText = result.response.text(); // Assuming this is the correct way to access the response text
    console.log("Generated Script:", responseText);

    // Return the result as JSON
    return NextResponse.json(
      { result: JSON.parse(responseText) },
      { status: 200 }
    );
  } catch (e) {
    // Error handling
    console.error("Error:", e);
    return NextResponse.json(
      { error: "Internal Server Error", message: e.message },
      { status: 500 }
    );
  }
}
