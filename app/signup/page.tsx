import Link from "next/link";
import { Video, Upload, Settings } from "lucide-react";
import { SignupForm } from "./form";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">MeetBrief</span>
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-slate-500">
                        Start transforming your meeting transcripts today
                    </p>
                </div>

                <SignupForm />

                <p className="px-8 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-indigo-600"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
