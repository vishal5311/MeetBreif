/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverComponentsExternalPackages: ['@remotion/bundler', '@remotion/renderer', 'esbuild', 'ffmpeg-static', 'ffprobe-static'],
    },
};

export default nextConfig;
