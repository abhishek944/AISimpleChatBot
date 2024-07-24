import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, {useEffect} from "react";
import {ChatUser, Message} from "@/lib/chat-list";
import ChatBottombar from "@/components/chat/chat-bottombar";
import { v4 as uuidv4 } from 'uuid';
import {Checkbox} from "@/components/ui/checkbox";


interface ChatProps {
    selectedUser: ChatUser;
    isMobile: boolean;
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
    const [selectedUserChat, setSelectedUserChat] = React.useState(selectedUser);
    const [globalSearchSelected, setGlobalSearchSelected] = React.useState(false);

    const fetchPrediction = async (message: string) => {
        const payload = {
            statement: message,
        };
        try {
            let url = 'https://123e-49-207-208-65.ngrok-free.app/predict'
            if (globalSearchSelected) {
                url = 'https://123e-49-207-208-65.ngrok-free.app/global-predict'
            }
            console.log(globalSearchSelected)
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //console.log(data); // Assuming the response has a 'message' field
            return data.prediction
        } catch (error) {
            console.error('Failed to fetch prediction:', error);
        }
        return 'Sorry! Couldn\'t fetch information';
    };

    const sendMessage = async (newMessage: Message) => {
        addMessage(newMessage);
    };

    const addMessage = (newMessage: Message) => {
        newMessage.order = selectedUserChat.messages.length + 1;
        const updatedMessages = [...selectedUserChat.messages, newMessage];
        setSelectedUserChat(prevState => ({
            ...prevState,
            messages: updatedMessages,
        }));
    }

    const handleGlobalSearchSelected = (checked: boolean) => {
        setGlobalSearchSelected(checked);
    }

    useEffect(() => {

        const fetchAndAddPredictionMessage = async () => {
            const lastMessage = selectedUserChat.messages[selectedUserChat.messages.length - 1];
            if (lastMessage && lastMessage.sentBy === 'self-user') {
                const predictionMessage = await fetchPrediction(lastMessage.message);
                const aiMessage: Message = {
                    id: uuidv4(),
                    message: predictionMessage,
                    sentBy: 'chat-user',
                };
                addMessage(aiMessage);
            }
        };

        fetchAndAddPredictionMessage();

    }, [selectedUserChat.messages])

    return (
        <div className="flex flex-col h-full">
            <div className="flex-none h-[15%]">
                <ChatTopbar selectedUser={selectedUser}/>
            </div>
            <div className="flex-grow h-[70%] overflow-hidden">
                <ChatList
                    selectedUser={selectedUserChat}
                    sendMessage={sendMessage}
                    isMobile={isMobile}
                />
            </div>
            <div className="flex-none h-[15%]">
                <ChatBottombar sendMessage={sendMessage} isMobile={isMobile}/>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="global-search"
                    onCheckedChange={handleGlobalSearchSelected}
                />
                <label
                    htmlFor="global-search"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Global Search
                </label>
            </div>
        </div>
    );
}
