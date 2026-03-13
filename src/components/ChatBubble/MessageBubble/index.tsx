import type { ChatMessage } from "../../../@types/chatbot";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function MessageBubble({
    message,
    role
}: ChatMessage) {
    const normalizeLatex = (text: string): string => {
        return text
            // fix single-bracket block math: [ \frac ] → $$ \frac $$
            .replace(/\[\s*(\\[a-zA-Z].*?)\s*\]/gs, '$$$$$1$$$$')
            // fix \( \) inline → $ $
            .replace(/\\\(/g, '$').replace(/\\\)/g, '$')
            // fix \[ \] block → $$ $$
            .replace(/\\\[/g, '$$$$').replace(/\\\]/g, '$$$$')
    }

    return (
        <div className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble break-words whitespace-pre-line ${role === 'user' ?
                'bg-primary text-primary-content'
                : 'bg-base-300 text-black'}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[[rehypeKatex, { strict: false }]]}
                >
                    {normalizeLatex(message)}
                </ReactMarkdown>
            </div>

        </div>
    );
}