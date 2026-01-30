export interface Video {
    id: string;
    title: string;
    status: 'processing' | 'completed' | 'failed';
    createdAt: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    meetingDate: string;
    duration?: string;
}

export interface Transcript {
    id: string;
    fileName: string;
    content: string;
    uploadedAt: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name?: string;
}
