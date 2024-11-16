import { User } from "../user/User";

export interface Message {
    id: string;
    chatId: string;
    content: string;
    timestamp: string;
    sender: User;
}