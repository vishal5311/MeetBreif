"use client";

import { Download, Share2, Trash2, Play, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VideoGrid({ initialVideos }: { initialVideos: any[] }) {
    const [videos, setVideos] = useState(initialVideos);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        // Optimistic update
        setVideos(videos.filter(v => v.id !== id));

        const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            alert("Failed to delete video");
            setVideos(initialVideos); // Revert
        }
    };

    const handleShare = (url: string) => {
        if (navigator.share) {
            navigator.share({ title: 'Meeting Recap', url });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-bold">No videos yet. Start by uploading a transcript!</p>
                </div>
            ) : (
                videos.map((v) => (
                    <div key={v.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
                            {v.status === 'completed' ? (
                                <>
                                    <video
                                        src={v.url}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        poster=""
                                    />
                                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                        <button
                                            onClick={() => window.open(v.url, '_blank')}
                                            className="p-4 bg-white rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Play className="h-6 w-6 text-indigo-600 fill-indigo-600 ml-1" />
                                        </button>
                                    </div>
                                </>
                            ) : v.status === 'rendering' ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
                                    <span className="text-xs font-black text-indigo-300 uppercase tracking-widest text-center">
                                        Processing Your<br />Recap...
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-red-500">
                                    <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center font-black">!</div>
                                    <span className="text-xs font-bold uppercase tracking-widest">Failed</span>
                                </div>
                            )}

                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${v.status === 'completed' ? 'bg-emerald-500 text-white' :
                                        v.status === 'rendering' ? 'bg-amber-500 text-white animate-pulse' :
                                            'bg-red-500 text-white'
                                    }`}>
                                    {v.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-slate-900 truncate mb-1" title={v.title}>{v.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Created {new Date(v.created_at).toLocaleDateString()}
                            </p>

                            <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                                <button
                                    onClick={() => handleShare(v.url)}
                                    disabled={!v.url}
                                    className="flex-1 bg-indigo-50 text-indigo-700 h-10 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Share2 className="h-4 w-4" /> Share
                                </button>
                                <a
                                    href={v.url}
                                    download
                                    className={`p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors ${!v.url && 'pointer-events-none opacity-50'}`}
                                >
                                    <Download className="h-4 w-4 text-slate-600" />
                                </a>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="p-2.5 border border-red-100 rounded-xl hover:bg-red-50 transition-colors text-red-400 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
