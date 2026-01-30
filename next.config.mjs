/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@remotion/bundler', '@remotion/renderer', 'esbuild', 'ffmpeg-static', 'ffprobe-static'],
    },
};

export default nextConfig;
