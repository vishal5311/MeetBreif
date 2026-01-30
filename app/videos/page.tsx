export const dynamic = 'force-dynamic';
import { createClient } from "@/lib/supabase-server";
import { Search, Filter } from "lucide-react";
import { redirect } from "next/navigation";
import VideoGrid from "./video-grid";

export default async function VideosPage({ searchParams }: { searchParams: { q?: string } }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    let query = supabase
        .from('videos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (searchParams.q) {
        query = query.ilike('title', `%${searchParams.q}%`);
    }

    const { data: videos } = await query;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Your Videos</h1>
                    <p className="text-slate-500">Manage and share your generated meeting recaps.</p>
                </div>
                <div className="flex items-center gap-2">
                    <form className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            name="q"
                            defaultValue={searchParams.q}
                            placeholder="Search videos..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full sm:w-64 transition-all"
                        />
                    </form>
                    <button className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
                        <Filter className="h-4 w-4 text-slate-600" />
                    </button>
                </div>
            </div>

            <VideoGrid initialVideos={videos || []} />
        </div>
    );
}
