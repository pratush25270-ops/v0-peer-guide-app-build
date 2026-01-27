import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY || '' })

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENAI_API_KEY) {
      // Return a fallback response if API key is not configured
      return NextResponse.json({
        text: "Hi! I noticed we have some shared academic interests and I'd love to connect. What are you currently working on?",
        fallback: true
      })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt
    })

    const text = response.text || ''

    return NextResponse.json({ text })
  } catch (error) {
    console.error('[v0] Gemini API error:', error)
    return NextResponse.json(
      {
        text: "Hi! I noticed we share similar academic goals and I'd love to connect. What's been the most exciting part of your studies recently?",
        fallback: true
      },
      { status: 200 }
    )
  }
}
