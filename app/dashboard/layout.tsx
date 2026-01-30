import Link from "next/link";
import {
    LayoutDashboard,
    Upload,
    Video,
    Settings,
    LogOut,
    ChevronRight,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Upload Transcript", href: "/upload", icon: Upload },
        { name: "Your Videos", href: "/videos", icon: Video },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 hidden md:block">
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Video className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">MeetBrief</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors group"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50/50 mb-4">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                {user.email?.[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{user.email?.split('@')[0]}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <form action="/api/auth/signout" method="post">
                            <button
                                type="submit"
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64">
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center px-8 justify-between">
                    <div className="md:hidden flex items-center gap-2">
                        <div className="bg-indigo-600 p-1 rounded-md">
                            <Video className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold">MeetBrief</span>
                    </div>
                    <div className="hidden md:block">
                        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
