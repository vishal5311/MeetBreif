import path from "path";
import os from "os";
import fs from "fs";

export async function renderMeetingVideo(props: any, fileName: string) {
    // Dynamic import to avoid static analysis issues during Next.js build/dev startup
    const { bundle } = await import("@remotion/bundler");
    const { renderMedia, selectComposition } = await import("@remotion/renderer");

    const { enableTailwind } = await import("@remotion/tailwind");

    console.log("**************************************************");
    console.log("PROPS RECEIVED FOR RENDER:", JSON.stringify(props, null, 2));
    console.log("**************************************************");

    console.log("Bundling Remotion project with Tailwind...");
    const bundleLocation = await bundle({
        entryPoint: path.resolve("remotion/index.ts"),
        webpackOverride: (config) => enableTailwind(config),
    });

    console.log("Selecting composition...");
    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: "MeetingRecap",
        inputProps: props,
    });

    const outputLocation = path.join(os.tmpdir(), fileName);

    // Use ffmpeg-static and ffprobe-static to ensure binaries are available
    const [ffmpegInstaller, ffprobeInstaller] = await Promise.all([
        import("ffmpeg-static"),
        import("ffprobe-static")
    ]);

    const ffmpegPath = ffmpegInstaller.default || (ffmpegInstaller as any);
    const ffprobePath = ffprobeInstaller.path || (ffprobeInstaller as any).path;

    if (ffmpegPath) {
        const ffmpegDir = path.dirname(ffmpegPath);
        process.env.PATH = `${ffmpegDir}${path.delimiter}${process.env.PATH}`;
        console.log("Added ffmpeg to PATH:", ffmpegDir);
    }

    if (ffprobePath) {
        const ffprobeDir = path.dirname(ffprobePath);
        process.env.PATH = `${ffprobeDir}${path.delimiter}${process.env.PATH}`;
        console.log("Added ffprobe to PATH:", ffprobeDir);
    }

    console.log("Rendering media to:", outputLocation);
    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation,
        inputProps: props,
        onBrowserLog: (log) => {
            console.log(`[Browser Log] [${log.type}] ${log.text}`);
        },
    });

    return outputLocation;
}
