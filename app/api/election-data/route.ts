import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const mockData = {
  booths: [
    { id: 1, name: "City Public School", address: "123 Main St", distance: "0.5 km", lat: 28.6139, lng: 77.2090 },
    { id: 2, name: "Community Center Hall", address: "456 Oak Ave", distance: "1.2 km", lat: 28.6150, lng: 77.2100 },
    { id: 3, name: "Govt Secondary School", address: "789 Pine Ln", distance: "2.0 km", lat: 28.6120, lng: 77.2080 }
  ],
  voteCounting: [
    { time: "08:00 AM", partyA: 1000, partyB: 800, partyC: 300 },
    { time: "10:00 AM", partyA: 5000, partyB: 4200, partyC: 1500 },
    { time: "12:00 PM", partyA: 12000, partyB: 11000, partyC: 4000 },
    { time: "02:00 PM", partyA: 25000, partyB: 20000, partyC: 8000 },
    { time: "04:00 PM", partyA: 40000, partyB: 35000, partyC: 12000 },
    { time: "Final Result", partyA: 55000, partyB: 48000, partyC: 15000 }
  ]
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const forceMock = searchParams.get('mock') === 'true';

  if (type === 'booths') {
    return NextResponse.json(mockData.booths);
  } else if (type === 'voteCounting') {
    if (forceMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json({ ongoing: true, data: mockData.voteCounting });
    }

    try {
      if (!process.env.GEMINI_API_KEY) throw new Error('No API Key');
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const prompt = `Are there any major Indian state or national elections currently undergoing LIVE vote counting today? 
      Answer ONLY in raw JSON format matching this schema:
      {
        "ongoing": boolean, // true ONLY if live vote counting is happening today. Do not return true for upcoming or past elections.
        "data": [
          { "time": "Current Time", "partyA": number, "partyB": number, "partyC": number }
        ] // Provide an array with at least one element if ongoing=true, containing estimated live vote counts for top 3 parties. If ongoing=false, this can be empty.
      }`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      
      const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text.trim();
      const parsed = JSON.parse(jsonString);

      return NextResponse.json(parsed);
    } catch (e) {
      console.error('Error fetching real data:', e);
      return NextResponse.json({ ongoing: false });
    }
  }

  return NextResponse.json(mockData);
}
