import { createAdminClient } from "./supabase-admin";
import fs from "fs";

export async function uploadVideo(filePath: string, fileName: string): Promise<string> {
    const fileContent = fs.readFileSync(filePath);
    const supabase = createAdminClient();

    // Upload the file to Supabase Storage 'videos' bucket
    const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, fileContent, {
            contentType: 'video/mp4',
            upsert: true
        });

    if (error) {
        throw new Error(`Supabase Storage Error: ${error.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

    return publicUrl;
}
