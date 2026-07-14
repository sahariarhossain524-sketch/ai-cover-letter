import { useState } from 'react';

interface GenerateResponse {
  coverLetter?: string;
  error?: string;
}

export function useCoverLetterGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');

  const generate = async (resume: string, jobDescription: string) => {
    if (!resume || !jobDescription) {
      setError("Please provide both your resume and the job description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedLetter("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const data = (await response.json()) as GenerateResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate cover letter.");
      }

      if (data.coverLetter) {
        setGeneratedLetter(data.coverLetter);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected network error occurred.';
      setError(errorMessage);
      console.error('[AI Generator Error]:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    generatedLetter,
    setGeneratedLetter,
    setError
  };
}
