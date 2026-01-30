import React from 'react';
import { AbsoluteFill, Series, useVideoConfig, useCurrentFrame, interpolate, spring } from 'remotion';
import '../style.css';

export interface MeetingRecapProps {
    title: string;
    duration: string;
    speakers: string[];
    decisions: string[];
    tasks: { owner: string; task: string }[];
    deadlines: string[];
}

const TitleScene: React.FC<{ title: string; duration: string }> = ({ title, duration }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const scale = spring({ frame, fps, config: { damping: 10 } });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a' }} className="flex flex-col items-center justify-center text-white p-10">
            <div style={{ opacity, transform: `scale(${scale})` }} className="text-center">
                <div className="mb-8 flex justify-center">
                    <div className="bg-indigo-600 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">Meeting Recap</div>
                </div>
                <h1 className="text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto">{title}</h1>
                <div className="flex items-center justify-center gap-4 text-2xl text-slate-400 font-medium">
                    <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-2 h-2 bg-slate-700 rounded-full" />
                    <span>{duration} duration</span>
                </div>
            </div>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        </AbsoluteFill>
    );
};

const ParticipantsScene: React.FC<{ speakers: string[] }> = ({ speakers }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#f8fafc' }} className="flex flex-col items-center justify-center p-20">
            <div className="w-full max-w-4xl">
                <h2 className="text-5xl font-bold text-slate-900 mb-16 flex items-center gap-4">
                    <span className="w-12 h-1 bg-indigo-600 rounded-full" />
                    Participants
                </h2>
                <div className="flex flex-wrap gap-6">
                    {speakers.map((speaker, i) => {
                        const delay = i * 5;
                        const opac = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const slide = interpolate(frame - delay, [0, 20], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        return (
                            <div
                                key={speaker}
                                style={{ opacity: opac, transform: `translateY(${slide}px)` }}
                                className="bg-white border border-slate-200 px-10 py-5 rounded-3xl shadow-xl shadow-slate-200/50 text-2xl font-semibold text-slate-800 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-400">
                                    {speaker[0]}
                                </div>
                                {speaker}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const DecisionsScene: React.FC<{ decisions: string[] }> = ({ decisions }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#312e81' }} className="text-white p-24">
            <div className="w-full max-w-5xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-5xl font-bold mb-4">Key Decisions</h2>
                    <div className="w-24 h-2 bg-green-400 rounded-full" />
                </div>
                <div className="space-y-10">
                    {decisions.slice(0, 4).map((decision, i) => { // Limit to fit screen nicely
                        const delay = i * 15;
                        const opac = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const slide = interpolate(frame - delay, [0, 30], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        return (
                            <div
                                key={i}
                                style={{ opacity: opac, transform: `translateX(${slide}px)` }}
                                className="flex items-start gap-8 group"
                            >
                                <div className="mt-3 w-6 h-6 border-4 border-green-400 rounded-full flex-shrink-0 group-hover:bg-green-400 transition-colors" />
                                <p className="text-4xl text-indigo-50 font-medium leading-relaxed">{decision}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const TasksScene: React.FC<{ tasks: { owner: string; task: string }[] }> = ({ tasks }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#ffffff' }} className="p-24">
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-5xl font-black text-slate-900 mb-16 flex items-center gap-6">
                    Action Items
                    <span className="text-2xl font-bold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-xl">To-Do</span>
                </h2>
                <div className="space-y-8">
                    {tasks.slice(0, 5).map((t, i) => {
                        const delay = i * 12;
                        const opac = interpolate(frame - delay, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const scale = interpolate(frame - delay, [0, 25], [0.95, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        return (
                            <div
                                key={i}
                                style={{ opacity: opac, transform: `scale(${scale})` }}
                                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-10 h-10 border-4 border-indigo-200 rounded-2xl bg-white" />
                                    <span className="text-3xl text-slate-800 font-bold">{t.task}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-black text-slate-400 uppercase tracking-tighter">ASSIGNEE</span>
                                    <span className="text-2xl font-black text-indigo-600 italic">
                                        {t.owner}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const DeadlinesScene: React.FC<{ deadlines: string[] }> = ({ deadlines }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff1f2' }} className="p-24">
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold text-rose-900 mb-20 flex items-center gap-4">
                    <div className="w-4 h-12 bg-rose-500 rounded-full" />
                    Deadlines
                </h2>
                <div className="grid grid-cols-1 gap-8">
                    {deadlines.slice(0, 3).map((deadline, i) => {
                        const delay = i * 20;
                        const opac = interpolate(frame - delay, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const slide = interpolate(frame - delay, [0, 30], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        return (
                            <div
                                key={i}
                                style={{ opacity: opac, transform: `translateY(${slide}px)` }}
                                className="bg-white border-l-8 border-rose-500 p-10 rounded-2xl shadow-2xl shadow-rose-200/50 flex items-center justify-between"
                            >
                                <p className="text-3xl font-bold text-slate-900 leading-tight">{deadline}</p>
                                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
                                    <div className="w-8 h-8 text-rose-500 font-black">!</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const ClosingScene: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 30], [0, 1]);
    const scale = interpolate(frame, [0, 60], [1.1, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a' }} className="flex items-center justify-center text-white overflow-hidden">
            <div style={{ opacity, transform: `scale(${scale})` }} className="text-center z-10">
                <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-indigo-500/40 transform rotate-12">
                    <span className="text-6xl font-black italic -rotate-12">MB</span>
                </div>
                <h2 className="text-6xl font-black mb-4 tracking-tight">MeetBrief</h2>
                <p className="text-2xl text-slate-400 font-medium">Capture. Summarize. Conquer.</p>
                <div className="mt-12 text-slate-500 text-lg font-bold tracking-widest uppercase">meetbrief.app</div>
            </div>

            {/* Abstract background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </AbsoluteFill>
    );
};

export const MeetingRecap: React.FC<MeetingRecapProps> = (props) => {
    console.log("REMOTION COMPONENT RECEIVED PROPS:", JSON.stringify(props));

    // Defensive defaults to prevent crashes
    const speakers = props.speakers || [];
    const decisions = props.decisions || [];
    const tasks = props.tasks || [];
    const deadlines = props.deadlines || [];
    const title = props.title || 'Meeting Recap';
    const duration = props.duration || '00:00';

    const { fps } = useVideoConfig();

    // Adaptive durations based on content length (max 2 minutes)
    const titleFrames = 4 * fps;
    const participantsFrames = Math.max(4, Math.min(6, (speakers.length || 1) * 0.8)) * fps;
    const decisionsFrames = Math.max(5, Math.min(10, (decisions.length || 1) * 2)) * fps;
    const tasksFrames = Math.max(5, Math.min(10, (tasks.length || 1) * 1.5)) * fps;
    const deadlinesFrames = Math.max(4, Math.min(8, (deadlines.length || 1) * 2)) * fps;
    const closingFrames = 4 * fps;

    return (
        <div className="w-full h-full font-sans selection:bg-indigo-500 selection:text-white bg-slate-900">
            <Series>
                <Series.Sequence durationInFrames={Math.floor(titleFrames)}>
                    <TitleScene title={title} duration={duration} />
                </Series.Sequence>

                {speakers.length > 0 && (
                    <Series.Sequence durationInFrames={Math.floor(participantsFrames)}>
                        <ParticipantsScene speakers={speakers} />
                    </Series.Sequence>
                )}

                {decisions.length > 0 && (
                    <Series.Sequence durationInFrames={Math.floor(decisionsFrames)}>
                        <DecisionsScene decisions={decisions} />
                    </Series.Sequence>
                )}

                {tasks.length > 0 && (
                    <Series.Sequence durationInFrames={Math.floor(tasksFrames)}>
                        <TasksScene tasks={tasks} />
                    </Series.Sequence>
                )}

                {deadlines.length > 0 && (
                    <Series.Sequence durationInFrames={Math.floor(deadlinesFrames)}>
                        <DeadlinesScene deadlines={deadlines} />
                    </Series.Sequence>
                )}

                <Series.Sequence durationInFrames={Math.floor(closingFrames)}>
                    <ClosingScene />
                </Series.Sequence>
            </Series>
        </div>
    );
};
