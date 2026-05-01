import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Provide context to the model so it acts as an election assistant
    const systemPrompt = `You are an AI Election Assistant for a civic education platform called 'Election Compass'. 
Your goal is to answer questions about the democratic election process, voting steps, timelines, and civic duties in a simple, educational, and unbiased manner. 
Keep your answers concise, clear, and easy to understand for the general public.`;

    const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${message}`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error('Error in Gemini API:', error);
    
    // Provide a more helpful error message to the frontend if it's a 404 or authentication issue
    let errorMessage = 'Failed to process your request. Please try again later.';
    if (error.status === 404 || error.message?.includes('404')) {
      errorMessage = 'Invalid Gemini API Key or Model unavailable. Please check your API key in .env.local.';
    } else if (error.status === 403 || error.status === 401) {
      errorMessage = 'Authentication failed. Please check your Gemini API key.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
