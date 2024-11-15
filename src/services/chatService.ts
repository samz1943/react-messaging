import { Chat } from "../interfaces/chat/Chat";
import { ChatRequest } from "../interfaces/chat/ChatRequest";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import api from "./api";

export const getChats = async (param: ChatRequest): Promise<PaginatedResponse<Chat>> => {
    const response = await api.get('/chats', {params: { ...param }});
    return response.data;
}
