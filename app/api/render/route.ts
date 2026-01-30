import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';
import { parseTranscript } from '@/lib/parser';
import { renderMeetingVideo } from '@/lib/render';
import { uploadVideo } from '@/lib/storage';
import fs from 'fs';

/**
 * POST /api/render
 * Accept transcript text, parse it, and trigger background video rendering.
 */
export async function POST(req: Request) {
    try {
        const { transcript, title } = await req.json();

        if (!transcript) {
            return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
        }

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Parse transcript to MeetingSummary
        const summary = parseTranscript(transcript);

        // 2. Create initial record in 'videos' table
        const adminSupabase = createAdminClient();
        const { data: videoRecord, error: dbError } = await adminSupabase
            .from('videos')
            .insert({
                user_id: user.id,
                title: title || summary.title || 'Untitled Meeting',
                status: 'rendering',
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database insertion error:', dbError);
            return NextResponse.json({
                error: 'Failed to create video record',
                details: dbError.message,
                code: dbError.code
            }, { status: 500 });
        }

        // 3. Trigger background rendering pipeline
        // We do NOT await this so we can return immediately
        processRendering(videoRecord.id, summary).catch(err => {
            console.error(`Uncaught error in processRendering for ${videoRecord.id}:`, err);
        });

        return NextResponse.json({
            message: 'Rendering process initiated',
            videoId: videoRecord.id,
            status: 'rendering'
        });

    } catch (error: any) {
        console.error('API /api/render error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * Handles the actual rendering and uploading in the background.
 */
async function processRendering(videoId: string, summary: any) {
    const adminSupabase = createAdminClient();
    let localPath = "";

    try {
        console.log("**************************************************");
        console.log(`[${videoId}] STARTING BACKGROUND RENDER`);
        console.log("**************************************************");
        const fileName = `recap-${videoId}.mp4`;
        console.log("Summary props to render:", JSON.stringify(summary, null, 2));

        // Render video using Remotion
        localPath = await renderMeetingVideo(summary, fileName);
        console.log(`[${videoId}] RENDER COMPLETED SUCCESSFULLY: ${localPath}`);

        // Upload to Supabase Storage
        console.log(`[${videoId}] UPLOADING TO SUPABASE STORAGE...`);
        const stats = fs.statSync(localPath);
        console.log(`[${videoId}] FILE SIZE TO UPLOAD: ${stats.size} bytes (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

        const publicUrl = await uploadVideo(localPath, fileName);
        console.log(`[${videoId}] UPLOAD COMPLETED SUCCESSFULLY: ${publicUrl}`);

        // Update database with URL and completed status
        const { error: updateError } = await adminSupabase
            .from('videos')
            .update({
                url: publicUrl,
                status: 'completed'
            })
            .eq('id', videoId);

        if (updateError) throw updateError;
        console.log(`[${videoId}] DATABASE UPDATED TO COMPLETED`);

    } catch (error: any) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error(`[${videoId}] BACKGROUND RENDERING FAILED ERROR:`, error.message);
        console.error(error.stack);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        // Write error to a local log file for debugging
        fs.appendFileSync('render-errors.log', `[${new Date().toISOString()}] [${videoId}] FAILED: ${error.message}\n${error.stack}\n\n`);

        // Mark as failed in DB
        await adminSupabase
            .from('videos')
            .update({ status: 'failed' })
            .eq('id', videoId);

    } finally {
        // Cleanup local temp file
        if (localPath && fs.existsSync(localPath)) {
            try {
                fs.unlinkSync(localPath);
                console.log(`[${videoId}] Cleaned up local file: ${localPath}`);
            } catch (cleanupError) {
                console.error(`[${videoId}] Failed to cleanup file:`, cleanupError);
            }
        }
    }
}
