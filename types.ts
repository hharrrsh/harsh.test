
export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    Expert = 'Expert',
}

export enum ResourceType {
    Read = 'Read',
    Watch = 'Watch',
    Interact = 'Interact',
    Listen = 'Listen'
}

export interface LearningResource {
    type: ResourceType;
    title: string;
    description: string;
    source: string;
    url: string;
}

export interface TopicDetails {
    topicName: string;
    summary: string;
    whyItMatters: string;
    difficulty: Difficulty;
    relatedTopics: string[];
    learningPath: LearningResource[];
}