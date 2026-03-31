import type { ChatMessage } from "../../../@types/chatbot";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useCallback } from "react";

export default function MessageBubble({
    message,
    role
}: ChatMessage) {
    const normalizeLatex = useCallback((text: string): string => {
    return (
      text
        // \( \) inline math → $ $
        .replace(/\\\(/g, "$")
        .replace(/\\\)/g, "$")
        // \[ \] block math → $$ $$
        .replace(/\\\[/g, "$$")
        .replace(/\\\]/g, "$$")
        // [ \frac{}{} ] block math, but NOT Markdown links [text](url)
        // Only match if content starts with a backslash command
        .replace(/\[\s*(\\[^\]]+?)\s*\]/gs, (_, inner) => `$$${inner}$$`)
    );
  }, []);

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