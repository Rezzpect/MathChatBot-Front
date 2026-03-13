export interface ChatMessage {
    message: string;
    role: "user" | "bot"
}

export const ChatModeType = {
    QUESTION_MODE:'question', 
    THEORY_MODE:'theory'
}

export type ChatMode = (typeof ChatModeType)[keyof typeof ChatModeType]