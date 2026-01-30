"use client";

import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function UpgradeButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/checkout", { method: "POST" });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("Failed to create checkout session");
            }
        } catch (error) {
            alert("Payment system unavailable. Please try again later.");
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="h-4 w-4" />
            )}
            Upgrade to Pro
        </button>
    );
}
