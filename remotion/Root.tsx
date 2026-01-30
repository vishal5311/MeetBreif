import React from 'react';
import { Composition } from 'remotion';
import { MainRecap } from './compositions/MainRecap';
import { MeetingRecap, MeetingRecapProps } from './compositions/MeetingRecap';

const defaultMeetingProps: MeetingRecapProps = {
    title: 'Product Launch Strategy',
    duration: '45 mins',
    speakers: ['Vishal', 'John', 'Sarah', 'Mike'],
    decisions: [
        'Marketing budget increased by 20%',
        'Launch date confirmed for next Monday',
        'Approved new website design'
    ],
    tasks: [
        { owner: 'John', task: 'Finalize frontend development' },
        { owner: 'Sarah', task: 'Review marketing copy' },
        { owner: 'Mike', task: 'Setup hosting environment' }
    ],
    deadlines: [
        'Content lock by Friday',
        'Launch Monday at 9 AM'
    ]
};

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MainRecap"
                component={MainRecap as any}
                durationInFrames={150}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    title: 'Meeting Recap',
                    summary: 'This is a summary of the meeting highlights.',
                    points: [
                        'Discussed Q4 goals',
                        'Finalized marketing budget',
                        'Set next steps for project Alpha'
                    ]
                }}
            />
            <Composition
                id="MeetingRecap"
                component={MeetingRecap as any}
                durationInFrames={3600} // 2 minutes at 30fps
                fps={30}
                width={1920}
                height={1080}
                defaultProps={defaultMeetingProps}
            />
            <Composition
                id="MeetingRecapSquare"
                component={MeetingRecap as any}
                durationInFrames={3600} // 2 minutes at 30fps
                fps={30}
                width={1080}
                height={1080}
                defaultProps={defaultMeetingProps}
            />
        </>
    );
};
