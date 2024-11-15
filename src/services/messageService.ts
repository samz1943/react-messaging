import { Message } from "../interfaces/message/Message";
import { MessageRequest } from "../interfaces/message/MessageRequest";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import api from "./api";

export const getMessages = async (chatId: string, param: MessageRequest): Promise<PaginatedResponse<Message>> => {
    const response = await api.get('/chats/' + chatId + '/messages', {params: { ...param }});
    return response.data;
}
