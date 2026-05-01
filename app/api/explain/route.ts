import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { updateText, complexity = 'standard' } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let systemPrompt = `You are a civic education assistant for the 'Election Compass' platform. Your job is to explain the following live election update in simple language so that a first-time voter can understand exactly what it means in the context of the overall election process.`;
    
    if (complexity === 'simple') {
      systemPrompt += ` Explain it in VERY simple, plain English. Avoid all jargon. Explain it like I am 10 years old. Keep it under 2 sentences.`;
    } else {
      systemPrompt += ` Keep your explanation short, clear, and educational. Keep it under 3 sentences.`;
    }

    const result = await model.generateContent(`${systemPrompt}\n\nLive Election Update to Explain:\n"${updateText}"\n\nAI Explanation:`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ explanation: text });
  } catch (error: any) {
    console.error('Error in Gemini API /explain:', error);
    return NextResponse.json(
      { error: `Failed to generate explanation: ${error.message || error}` },
      { status: 500 }
    );
  }
}
