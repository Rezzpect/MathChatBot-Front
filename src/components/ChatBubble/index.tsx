import type { ChatMessage } from "../../@types/chatbot";

export default function ChatBubble({
    message,
    role
}: ChatMessage) {

    return (
        <div className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble break-words whitespace-pre-line ${role === 'user'? 
            'bg-primary text-primary-content'
        : 'bg-base-100} text-black'}`}>
                {message}
            </div>

        </div>
    );
}