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
    name: 'Mr. A',
}

export const ChatUserSample: ChatUser = {
    id: '2',
    avatar: 'ai-avatar.png',
    name: 'AI Bot',
    messages: [
        {
            id: '1',
            message: "Hello! I'm your AI chat-bot. By default I look up the trained data to answer your questions. But you can check the 'global-search' checkbox at the bottom and I'll answer to the best of my knowledge.",
            order: 1,
            sentBy: 'chat-user',
        },
    ],
}



