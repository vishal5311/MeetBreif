export interface Task {
    owner: string;
    task: string;
}

export interface MeetingSummary {
    title: string;
    duration: string;
    speakers: string[];
    decisions: string[];
    tasks: Task[];
    deadlines: string[];
}

/**
 * Parses a raw meeting transcript into a structured summary.
 * 
 * Rules:
 * - Extract speakers from "[timestamp] Name: text"
 * - Detect decisions: decide, approved, final, confirm
 * - Detect tasks: will, handle, assign, do
 * - Detect deadlines: day/date/time words
 * - Calculate duration from timestamps
 */
export function parseTranscript(text: string): MeetingSummary {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const speakersSet = new Set<string>();
    const decisions: string[] = [];
    const tasks: Task[] = [];
    const deadlines: string[] = [];

    let firstTimestamp: number | null = null;
    let lastTimestamp: number | null = null;

    // Regex patterns
    const strictLineRegex = /^\[(\d{1,2}:?\d{2}:\d{2}|\d{1,2}:\d{2})\]\s*([^:]+):\s*(.*)$/i;
    const looseLineRegex = /^([^:]+):\s*(.*)$/i;

    const decisionKeywords = ['decide', 'approved', 'final', 'confirm', 'agreed', 'consensus'];
    const taskKeywords = ['will', 'handle', 'assign', 'do', 'action', 'responsible'];
    const deadlineKeywords = [
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
        'tomorrow', 'today', 'next week', 'deadline', 'january', 'february', 'march',
        'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
        'by next', 'due'
    ];

    // Helper to convert [HH:MM:SS] or [MM:SS] to seconds
    const parseTimeToSeconds = (timeStr: string): number => {
        const parts = timeStr.split(':').map(Number);
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return parts[0] * 60 + parts[1];
    };

    // Helper to format seconds to MM:SS or HH:MM:SS
    const formatSeconds = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    lines.forEach((line) => {
        let speakerName = "Participant";
        let content = line;

        const strictMatch = line.match(strictLineRegex);
        if (strictMatch) {
            const [, timestampStr, name, textContent] = strictMatch;
            speakerName = name.trim();
            content = textContent.trim();
            const timeInSec = parseTimeToSeconds(timestampStr);
            if (firstTimestamp === null || timeInSec < firstTimestamp) firstTimestamp = timeInSec;
            if (lastTimestamp === null || timeInSec > lastTimestamp) lastTimestamp = timeInSec;
        } else {
            const looseMatch = line.match(looseLineRegex);
            if (looseMatch) {
                const [, name, textContent] = looseMatch;
                speakerName = name.trim();
                content = textContent.trim();
            }
        }

        // Speaker tracking
        if (speakerName !== "Participant") speakersSet.add(speakerName);

        // Content analysis
        const lowContent = content.toLowerCase();

        // Decision detection
        if (decisionKeywords.some(keyword => lowContent.includes(keyword))) {
            decisions.push(content);
        }

        // Task detection
        if (taskKeywords.some(keyword => lowContent.includes(keyword))) {
            tasks.push({ owner: speakerName, task: content });
        }

        // Deadline detection
        if (deadlineKeywords.some(keyword => lowContent.includes(keyword))) {
            deadlines.push(content);
        }
    });

    const durationSec = (lastTimestamp !== null && firstTimestamp !== null)
        ? lastTimestamp - firstTimestamp
        : lines.length * 5; // Estimate 5s per line if no timestamps

    return {
        title: "Meeting Recap",
        duration: formatSeconds(durationSec),
        speakers: Array.from(speakersSet).slice(0, 8), // Limit to avoid clutter
        decisions: Array.from(new Set(decisions)).slice(0, 5),
        tasks: tasks.slice(0, 6),
        deadlines: Array.from(new Set(deadlines)).slice(0, 4)
    };
}

// Unit Test Examples
/**
 * Example Usage:
 * 
 * const transcript = `
 * [00:00] Vishal: Let's launch Monday
 * [00:20] John: I'll handle frontend
 * [00:45] Vishal: Deadline Friday
 * `;
 * 
 * const summary = parseTranscript(transcript);
 * console.log(JSON.stringify(summary, null, 2));
 */
