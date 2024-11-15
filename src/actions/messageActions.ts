import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { Message } from '../interfaces/message/Message';
import { MessageRequest } from '../interfaces/message/MessageRequest';
import { getMessages } from '../services/messageService';

export const fetchMessages = createAsyncThunk<PaginatedResponse<Message>, { chatId: string; request: MessageRequest }>(
  'messages/fetchMessages',
  async ({chatId, request}, { rejectWithValue }) => {
    try {
      const response = await getMessages(chatId, request);
      console.log('fetch message', response.data)
      return response;
    }  catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch messages');
    }
  }
);
