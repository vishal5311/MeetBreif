import path from "path";
import os from "os";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind";

async function testRender() {
    // Inject FFmpeg/FFprobe paths
    const ffmpegInstaller = require("ffmpeg-static");
    const ffprobeInstaller = require("ffprobe-static");
    const ffmpegDir = path.dirname(ffmpegInstaller);
    const ffprobeDir = path.dirname(ffprobeInstaller.path);
    process.env.PATH = `${ffmpegDir}${path.delimiter}${ffprobeDir}${path.delimiter}${process.env.PATH}`;
    console.log("Injected binaries into PATH");

    const bundleLocation = await bundle({
        entryPoint: path.resolve("remotion/index.ts"),
        webpackOverride: (config) => enableTailwind(config),
    });

    const props = {
        title: 'Diagnostic Test',
        duration: '10 mins',
        speakers: ['Bot'],
        decisions: ['Fix the black screen'],
        tasks: [{ owner: 'Bot', task: 'Get logs' }],
        deadlines: ['Now']
    };

    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: "MeetingRecap",
        inputProps: props,
    });

    const outputLocation = path.join(process.cwd(), "diag-video.mp4");
    if (fs.existsSync(outputLocation)) fs.unlinkSync(outputLocation);

    console.log("Rendering to:", outputLocation);

    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation,
        inputProps: props,
        onBrowserLog: (log) => {
            console.log(`[BROWSER] [${log.type}] ${log.text}`);
        },
        onProgress: ({ progress }) => {
            process.stdout.write(`\rProgress: ${(progress * 100).toFixed(1)}%`);
        }
    });

    console.log("\nRender finished. File exists:", fs.existsSync(outputLocation));
    if (fs.existsSync(outputLocation)) {
        console.log("File size:", fs.statSync(outputLocation).size, "bytes");
    }
}

testRender().catch(console.error);
