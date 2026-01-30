import Link from "next/link";
import { Video } from "lucide-react";
import { LoginForm } from "./form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <Video className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">MeetBrief</span>
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-slate-500">
                        Enter your email to sign in to your account
                    </p>
                </div>

                <LoginForm />

                <p className="px-8 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="underline underline-offset-4 hover:text-indigo-600"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
