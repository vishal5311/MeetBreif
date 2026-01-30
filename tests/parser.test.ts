import { parseTranscript } from './parser';

const testTranscript = `
[00:00] Vishal: Let's launch Monday
[00:20] John: I'll handle frontend
[00:45] Vishal: Deadline Friday
[01:10] John: I confirm the final plan
[01:30] Vishal: I will assign the tasks now
`;

console.log("Starting Transcript Parser Tests...");

const result = parseTranscript(testTranscript);

console.log("Parsed Result:");
console.log(JSON.stringify(result, null, 2));

// Assertions
const check = (label: string, condition: boolean) => {
    if (condition) {
        console.log(`✅ ${label}`);
    } else {
        console.error(`❌ ${label}`);
        process.exit(1);
    }
};

check("Duration should be 01:30", result.duration === "01:30");
check("Speakers should include Vishal and John", result.speakers.includes("Vishal") && result.speakers.includes("John"));
check("Speakers length should be 2", result.speakers.length === 2);
check("Decisions should contain 'confirm' and 'final' mentions", result.decisions.length === 1 && result.decisions[0].includes("confirm"));
check("Tasks should include John and Vishal", result.tasks.length === 2);
check("Deadlines should include Monday and Friday", result.deadlines.length === 2);

console.log("\nAll tests passed successfully!");
