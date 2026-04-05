import { useEffect, useRef, useState } from "react";
import type { ChatMessage, ChatMode } from "../../@types/chatbot";
import MessageBubble from "../ChatBubble/MessageBubble";
import { ChatModeType } from "../../@types/chatbot";
import { IoIosArrowDown } from "react-icons/io";
import supabaseClient from "../../utils/SupabaseClient";
import { useParams } from "react-router-dom";
import LoadBubble from "../ChatBubble/LoadBubble";
import toast from "react-hot-toast";

export default function Chatbot({
    messages,
    setMessages
}: { messages: ChatMessage[], setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>> }) {
    const [userInput, setUserInput] = useState<string>('');
    const [getMode, setMode] = useState<ChatMode>(ChatModeType.QUESTION_MODE);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const chatbotRef = useRef<HTMLDivElement>(null);
    const params = useParams();

    useEffect(() => {
        if (chatbotRef.current) {
            chatbotRef.current.scrollTo({ top: chatbotRef.current.scrollHeight })
        }
    }, [messages])

    const handleSend = async (message: string) => {
        if (!userInput) return

        setMessages((prev) => [
            ...prev,
            { message: message, role: 'user' }
        ])

        setUserInput('');

        setIsThinking(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('chat-handler', {
                method: 'POST',
                body: {
                    // mode: question or theory
                    mode: getMode.toLowerCase(),
                    message: message,
                    // questionResult will return session_id after first call
                    session_id: sessionId,
                    // question mode need id to not be null
                    question_id: params.questionId
                }
            })

            if (error) throw error;

            if (data) {
                if (!sessionId && data.session_id) {
                    setSessionId(data.session_id)
                }
                const reply = data.message;
                setMessages((prev) => [
                    ...prev,
                    { message: reply, role: 'bot' }

                ]);
            }
        } catch (error) {
            toast.error('Unable to reach chatbot');
            setMessages((prev) => [
                ...prev,
                { message: "An Unexpected Error has occurred", role: 'bot' }
            ]);
        } finally {
            setIsThinking(false);
        }
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex justify-between my-1 px-2 w-full items-center shrink-0">
                <div className="dropdown dropdown-start">

                    <div tabIndex={0} role="button" className="flex font-bold items-center gap-2 m-1 bg-base-300 hover:cursor-pointer p-2 rounded-lg">
                        <header>{getMode}</header><IoIosArrowDown />
                    </div>
                    <ul id={'mode-dropdown'} tabIndex={-1} className="dropdown-content font-bold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {Object.values(ChatModeType).map((mode_name, index) =>
                            <li key={`mode-${index}`}>
                                <a onClick={() => {
                                    setMode(mode_name);
                                    document.getElementById('mode-dropdown')?.blur();
                                }}>{mode_name}</a>
                            </li>
                        )}
                    </ul>
                </div>
                <header className="font-bold">Math Chatbot</header>
            </div>

            <div className="flex flex-col flex-1 bg-white rounded-lg border border-neutral overflow-hidden">
                <div ref={chatbotRef} className="flex-1 overflow-y-auto p-5">
                    {messages.map((chat) =>
                        <MessageBubble message={chat.message} role={chat.role} />
                    )}
                    {isThinking && <LoadBubble />}
                </div>

            </div>

            <form className="flex items-center gap-2 p-2 shrink-0"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(userInput);
                    // TestSendMessage()
                }}
            >
                <input type="text"
                    placeholder="Type here"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isThinking}
                    className="input rounded-full w-full focus:outline-none focus:border focus:border-primary" />
                <button
                    type='submit'
                    disabled={isThinking}
                    className="btn rounded-full btn-primary text-primary-content">{isThinking ? <span className="loading loading-spinner loading-lg" />:'Send'}</button>
            </form>
        </div>
    )
}