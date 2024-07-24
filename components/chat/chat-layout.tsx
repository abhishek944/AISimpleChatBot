import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatUserSample } from "@/lib/chat-list";

export function ChatLayout() {
    const [selectedUser, setSelectedUser] = React.useState(ChatUserSample);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    return (
        <div className="h-full items-stretch flex">
            <div className="flex-1">
                <Chat
                    selectedUser={selectedUser}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
}
