import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface MainRecapProps {
    title: string;
    summary: string;
    points: string[];
}

export const MainRecap: React.FC<MainRecapProps> = ({ title, summary, points }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill className="bg-slate-900 flex flex-col items-center justify-center p-20 text-white font-sans">
            <div style={{ opacity }} className="w-full max-w-5xl space-y-12">
                <header className="border-b-4 border-indigo-600 pb-8">
                    <h1 className="text-8xl font-black tracking-tight mb-2 uppercase">{title}</h1>
                    <p className="text-4xl text-slate-400 font-medium">{summary}</p>
                </header>

                <ul className="space-y-6">
                    {points.map((point, i) => {
                        const pointOpacity = interpolate(
                            frame,
                            [20 + i * 10, 40 + i * 10],
                            [0, 1],
                            { extrapolateRight: 'clamp' }
                        );
                        return (
                            <li
                                key={i}
                                className="flex items-center gap-6"
                                style={{ opacity: pointOpacity }}
                            >
                                <div className="h-4 w-4 bg-indigo-600 rounded-full" />
                                <span className="text-5xl font-bold">{point}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="absolute bottom-10 right-10 flex items-center gap-4">
                <div className="bg-indigo-600 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" /><rect width="14" height="12" x="2" y="6" rx="2" /></svg>
                </div>
                <span className="text-2xl font-black italic tracking-tighter">MEETBRIEF</span>
            </div>
        </AbsoluteFill>
    );
};
