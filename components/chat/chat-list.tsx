import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import ChatBottombar from "@/components/chat/chat-bottombar";
import {ChatUser, Message, SelfUserSample} from "@/lib/chat-list";

interface ChatListProps {
    selectedUser: ChatUser;
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
}

export function ChatList({
                             selectedUser,
                             sendMessage,
                             isMobile
                         }: ChatListProps) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [selectedUser.messages]);

    return (
        <>
            <div className="flex flex-col h-full">
                <div
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto overflow-x-hidden"
                >
                    <AnimatePresence>
                        {selectedUser.messages?.map((message, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{opacity: 0, scale: 1, y: 50, x: 0}}
                                animate={{opacity: 1, scale: 1, y: 0, x: 0}}
                                exit={{opacity: 0, scale: 1, y: 1, x: 0}}
                                transition={{
                                    opacity: {duration: 0.1},
                                    layout: {
                                        type: "spring",
                                        bounce: 0.3,
                                        duration: index * 0.05 + 0.2,
                                    },
                                }}
                                style={{
                                    originX: 0.5,
                                    originY: 0.5,
                                }}
                                className={cn(
                                    "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                    message.sentBy === 'self-user' ? "items-end" : "items-start"
                                )}
                            >
                                <div className="flex gap-3 items-center">
                                    {message.sentBy === 'self-user' && (
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={SelfUserSample.avatar}
                                                alt={SelfUserSample.name}
                                                width={6}
                                                height={6}
                                            />
                                        </Avatar>
                                    )}
                                    <span className=" bg-accent p-3 rounded-md">
                                        {message.message}
                                    </span>
                                    {message.sentBy !== 'self-user' && (
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={selectedUser.avatar}
                                                alt={selectedUser.name}
                                                width={6}
                                                height={6}
                                            />
                                        </Avatar>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}
