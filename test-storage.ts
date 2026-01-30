import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createAdminClient } from "./lib/supabase-admin";
import { exec } from "child_process";

async function testAll() {
    const supabase = createAdminClient();
    console.log("--- Supabase Storage Test ---");
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error("Error listing buckets:", error.message);
    } else {
        console.log("Buckets found:", buckets.map(b => b.name));
        const testFile = Buffer.from("test video content");
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('videos')
            .upload('test-connection.txt', testFile, { upsert: true });

        if (uploadError) {
            console.error("Upload FAILED:", uploadError.message);
        } else {
            console.log("Upload SUCCESSFUL:", uploadData.path);
        }
    }

    console.log("\n--- FFmpeg Test ---");
    exec("ffmpeg -version", (err, stdout) => {
        if (err) {
            console.error("ffmpeg NOT found in PATH!");
        } else {
            console.log("ffmpeg found:", stdout.split('\n')[0]);
        }
    });
}

testAll();
