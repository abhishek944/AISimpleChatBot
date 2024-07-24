import {cookies} from "next/headers";

export type Message = {
    id: string;
    message: string;
    order?: number;
    sentBy: 'self-user' | 'chat-user';
}

export type ChatUser = {
    id: string;
    avatar: string;
    messages: Message[];
    name: string;
}

export type SelfUser = {
    id: string;
    avatar: string;
    name: string;
}

export const SelfUserSample: SelfUser = {
    id: '1',
    avatar: 'user-avatar.png',
    name: 'John Doe',
}

export const ChatUserSample: ChatUser = {
    id: '2',
    avatar: 'ai-avatar.png',
    name: 'AI Bot',
    messages: [
        {
            id: '1',
            message: 'Hello, are you there?',
            order: 1,
            sentBy: 'self-user',
        },
        {
            id: '2',
            message: 'Yes, I am here.',
            order: 2,
            sentBy: 'chat-user',
        },
        {
            id: '3',
            message: 'How can I help you today?',
            order: 3,
            sentBy: 'chat-user',
        },
        {
            id: '4',
            message: 'I need help with my order.',
            order: 4,
            sentBy: 'self-user',
        },
        {
            id: '5',
            message: 'Sure, I can help you with that.',
            order: 5,
            sentBy: 'chat-user',
        }
    ],
}



