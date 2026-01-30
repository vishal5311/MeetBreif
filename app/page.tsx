import Link from "next/link";
import { ArrowRight, Video, FileText, Sparkles, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Video className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">MeetBrief</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 transition-colors" href="/login">
            Sign In
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700"
            href="/signup"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 mb-4">
                Now in Private Beta
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl">
                Turn Meeting Transcripts into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Video Recaps</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-slate-400 mt-6">
                Don't waste time reading long transcripts. MeetBrief uses AI to generate concise, engaging recap videos of your meetings in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-8 py-2 text-base font-medium text-white shadow-xl transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700"
                  href="/signup"
                >
                  Start Creating Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-2 text-base font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                  href="#demo"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built for Product Teams</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl lg:text-base xl:text-xl">
                Everything you need to keep your team aligned without the extra meetings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 mb-2">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Transcript Upload</h3>
                <p className="text-center text-slate-500">
                  Upload .txt, .vtt, or .srt files from Zoom, Teams, or Google Meet.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-violet-100 rounded-xl text-violet-600 mb-2">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Summarization</h3>
                <p className="text-center text-slate-500">
                  Our AI extracts the most important moments and action items.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 mb-2">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Remotion Powered</h3>
                <p className="text-center text-slate-500">
                  Beautifully animated video recaps rendered right in your browser.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-indigo-900 line-clamp-2">
                  Secure video generation for sensitive discussions.
                </h2>
                <p className="text-slate-500 text-lg">
                  We take privacy seriously. Your transcripts are processed securely and your videos are stored in encrypted R2 buckets.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    <span>Fast rendering engine</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-600/5 aspect-video rounded-3xl border border-indigo-100 flex items-center justify-center p-8 overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
                <div className="relative bg-white shadow-2xl rounded-xl p-4 w-full max-w-md transform transition-all group-hover:scale-105">
                  <div className="h-4 w-3/4 bg-slate-100 rounded mb-3"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded mb-6"></div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-indigo-50 rounded-lg"></div>
                    <div className="aspect-square bg-violet-50 rounded-lg"></div>
                    <div className="aspect-square bg-emerald-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-slate-500">© 2026 MeetBrief Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
