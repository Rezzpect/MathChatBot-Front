import { useState } from "react";
import type { ChatMessage, ChatMode } from "../../@types/chatbot";
import sendMessage from "../../services/sendChatMessage";
import ChatBubble from "../ChatBubble";
import { ChatModeType } from "../../@types/chatbot";
import { IoIosArrowDown } from "react-icons/io";

export default function Chatbot() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [getMode, setMode] = useState<ChatMode>(ChatModeType.HINT_MODE);

    const handleSend = async (message: string) => {
        if (!userInput) return

        setMessages((prev) => [
            ...prev,
            { message: message, role: 'user' }
        ])
        try {
            const res = await sendMessage(message);
            const reply = res.reply;

            setMessages((prev) => [
                ...prev,
                { message: reply, role: 'bot' }

            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { message: "An Unexpected Error has occured", role: 'bot' }
            ]);
        }

        setUserInput('');
    }

    const TestSendMessage = () => {
        setMessages((prev) => [...prev,
            {
                role:'user',
                message:userInput
            }
        ]);
        setMessages((prev) => [...prev,
            {
                role:'bot',
                message:'Message received'
            }
        ]);
        setUserInput('');
    }

    return (
        <div className="h-200 w-full">
            <div className="flex justify-between my-1 px-2 w-full items-center">
                <div className="dropdown dropdown-start">

                    <div tabIndex={0} role="button" className="flex font-bold items-center gap-2 m-1 hover:cursor-pointer hover:bg-base-300 p-2 rounded-lg">
                        <header>{getMode}</header><IoIosArrowDown />
                    </div>
                    <ul tabIndex={-1} className="dropdown-content font-bold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {Object.values(ChatModeType).map((mode_name) =>
                            <li><a onClick={() => setMode(mode_name)}>{mode_name}</a></li>
                        )}
                    </ul>
                </div>
                <header className="font-bold">Math Chatbot</header>
            </div>

            <div className="bg-white rounded-lg max-h-[80%] h-[500px] w-full border-1 border-neutral">
                <div className="w-full h-full overflow-y-scroll p-5">
                    {messages.map((chat) =>
                    <ChatBubble message={chat.message} role={chat.role} />
                )}
                </div>
                
            </div>

            <div className="flex items-center h-[10%] w-full gap-2 px-2">
                <input type="text"
                    placeholder="Type here"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)} className="input rounded-full w-full focus:outline-none" />
                <button
                onClick={()=>{
                    // handleSend(userInput)
                    TestSendMessage()    
                }} 
                className="btn rounded-full btn-primary text-primary-content">Send</button>
            </div>
        </div>
    )
}