"use client";

import { useState } from "react";
import { Upload, FileText, Info, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TranscriptUpload({ canCreate }: { canCreate: boolean }) {
    const [transcript, setTranscript] = useState("");
    const [title, setTitle] = useState("");
    const [isRendering, setIsRendering] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transcript.trim()) return;
        if (!canCreate) {
            setError("Monthly limit reached. Please upgrade to Pro.");
            return;
        }

        setIsRendering(true);
        setError("");

        try {
            const res = await fetch("/api/render", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript, title }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to start render");

            // Redirect to videos page
            router.push("/videos?new=true");
        } catch (err: any) {
            console.error("Render error:", err);
            setError(err.message);
            setIsRendering(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Video Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Weekly Strategy Sync"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transcript Text</label>
                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="[00:00] Vishal: Let's launch Monday..."
                            rows={10}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-slate-200 h-fit">
                            <Info className="h-5 w-5 text-indigo-600" />
                        </div>
                        <p className="text-sm text-slate-500 max-w-md">
                            Ensure transcripts include **[HH:MM] Name: Message** format for best results.
                        </p>
                    </div>

                    <button
                        disabled={isRendering || !transcript.trim() || !canCreate}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isRendering ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Rendering...
                            </>
                        ) : (
                            "Generate Recap"
                        )}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold animate-shake">
                    ⚠️ {error}
                </div>
            )}
        </form>
    );
}
