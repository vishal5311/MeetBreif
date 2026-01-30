import { getSubscriptionStatus } from "@/lib/subscription";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import TranscriptUpload from "./transcript-upload";

export default async function UploadPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { canCreate, videoCount, isPro } = await getSubscriptionStatus(user.id);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Recap</h1>
                    <p className="text-slate-500">Transform meeting text into a professional recap video.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Usage</p>
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${videoCount >= 5 && !isPro ? 'bg-red-500' : 'bg-indigo-600'}`}
                                style={{ width: isPro ? '10%' : `${(videoCount / 5) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm font-black text-slate-700">{isPro ? '∞' : `${videoCount}/5`}</span>
                    </div>
                </div>
            </div>

            <TranscriptUpload canCreate={canCreate} />
        </div>
    );
}
