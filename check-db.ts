import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createAdminClient } from "./lib/supabase-admin";

async function checkVideos() {
    const supabase = createAdminClient();
    const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error:", error.message);
        return;
    }

    console.log("--- VIDEO DATABASE STATUS ---");
    videos.forEach(v => {
        console.log(`TITLE: ${v.title}`);
        console.log(`STATUS: ${v.status}`);
        console.log(`ID: ${v.id}`);
        console.log(`URL: ${v.url}`);
        console.log("----------------------------");
    });
}

checkVideos();
