export interface ChatMessage {
    message: string;
    role: "user" | "bot"
}

export const ChatModeType = {
    QUESTION_MODE:'Question', 
    THEORY_MODE:'Theory'
}

export type ChatMode = (typeof ChatModeType)[keyof typeof ChatModeType]