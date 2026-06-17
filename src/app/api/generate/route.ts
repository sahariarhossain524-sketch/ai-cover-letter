import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and Job Description are required' },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert career coach and professional copywriter.
      Write a highly professional, compelling, and tailored cover letter based on the following Resume and Job Description.
      
      Instructions:
      1. Analyze the Job Description to identify key skills, requirements, and the company's tone.
      2. Analyze the Resume to find the most relevant experiences and skills that match the Job Description.
      3. Write a 3-4 paragraph cover letter.
      4. The tone should be confident, professional, and enthusiastic.
      5. Do not include placeholders like "[Your Name]" if the information is available in the resume. If it's not available, leave the placeholder.
      6. Output ONLY the cover letter text, without any additional conversational text.

      Resume:
      ${resume}

      Job Description:
      ${jobDescription}
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ coverLetter: response.text });
  } catch (error: any) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    );
  }
}
