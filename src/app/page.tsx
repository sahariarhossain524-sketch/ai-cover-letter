"use client";

import { useState } from "react";
import { Sparkles, FileText, Briefcase, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { useCoverLetterGenerator } from "@/hooks/useCoverLetterGenerator";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [copied, setCopied] = useState(false);
  
  const { generate, isLoading, error, generatedLetter } = useCoverLetterGenerator();

  const handleGenerate = () => {
    generate(resume, jobDescription);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Smart Cover Letter <span className="text-emerald-600 dark:text-emerald-400">AI</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate highly tailored, professional cover letters in seconds using the power of Google Gemini AI. 
            Perfectly match your skills to the job requirements.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <div className="space-y-6 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
            <div>
              <label className="flex items-center text-sm font-semibold mb-2">
                <FileText className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Your Resume / Profile
              </label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume, LinkedIn summary, or key skills here..."
                className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the requirements and description of the job you are applying for..."
                className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !resume || !jobDescription}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 dark:disabled:bg-emerald-800/50 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-emerald-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                Generated Result
              </h2>
              {generatedLetter && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-semibold transition-colors"
                >
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy text</>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 relative overflow-hidden">
              {generatedLetter ? (
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed overflow-y-auto max-h-[500px] custom-scrollbar">
                  {generatedLetter}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <p>Your AI-crafted cover letter will appear here.</p>
                  <p className="text-sm mt-2 opacity-70">Fill in the details on the left and click generate!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>Built with Next.js, Tailwind CSS, and Google Gemini AI API.</p>
          <p className="mt-2">Created by Sahariar Hossain.</p>
        </footer>
      </div>
    </div>
  );
}
