import { createClient } from "@/lib/supabase-server";
import { getSubscriptionStatus } from "@/lib/subscription";
import { Video, Clock, TrendingUp, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import UpgradeButton from "@/components/upgrade-button";
import { FadeIn } from "@/components/animations";

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { videoCount, isPro } = await getSubscriptionStatus(user.id);

    const { data: recentVideos } = await supabase
        .from('videos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

    const stats = [
        { name: "Total Videos", value: videoCount.toString(), icon: Video, color: "text-indigo-600", bg: "bg-indigo-50" },
        { name: "Minutes Saved", value: (videoCount * 12).toString() + "m", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Plan", value: isPro ? "PRO" : "FREE", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
        { name: "Usage", value: isPro ? "∞" : `${videoCount}/5`, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
    ];

    return (
        <div className="space-y-8">
            <FadeIn>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back!</h1>
                        <p className="text-slate-500">Here's what's happening with your meetings.</p>
                    </div>
                    {!isPro && <UpgradeButton />}
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <FadeIn key={stat.name} delay={0.1 + i * 0.05}>
                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.bg} p-3 rounded-xl`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FadeIn delay={0.3}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Recent Videos</h3>
                            <Link href="/videos" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</Link>
                        </div>
                        <div className="space-y-4">
                            {(!recentVideos || recentVideos.length === 0) ? (
                                <div className="py-8 text-center text-slate-400 text-sm italic">
                                    No videos yet
                                </div>
                            ) : recentVideos.map((v) => (
                                <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="h-12 w-20 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                        {v.url ? (
                                            <video src={v.url} className="w-full h-full object-cover" />
                                        ) : (
                                            <Video className="h-5 w-5 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">{v.title}</p>
                                        <p className="text-xs text-slate-500 font-medium tracking-tight">
                                            {new Date(v.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${v.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                        v.status === 'rendering' ? 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse' :
                                            'bg-red-50 text-red-700 border border-red-100'
                                        } uppercase tracking-tighter`}>
                                        {v.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/upload" className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group text-center">
                                <Upload className="h-8 w-8 text-slate-400 group-hover:text-indigo-600 mb-3" />
                                <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-900 leading-tight">Create New Recap</span>
                            </Link>
                            <Link href="/videos" className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group text-center">
                                <Video className="h-8 w-8 text-slate-400 group-hover:text-indigo-600 mb-3" />
                                <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-900 leading-tight">View Library</span>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
