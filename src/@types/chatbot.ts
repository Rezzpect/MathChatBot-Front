export interface ChatMessage {
    message: string;
    role: "user" | "bot"
}

export const ChatModeType = {
    HINT_MODE:'Hint Mode', 
    THEORY_MODE:'Theory Mode'
}

export type ChatMode = (typeof ChatModeType)[keyof typeof ChatModeType]