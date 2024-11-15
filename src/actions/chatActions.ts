import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { Chat } from '../interfaces/chat/Chat';
import { ChatRequest } from '../interfaces/chat/ChatRequest';
import { getChats } from '../services/chatService';

export const fetchChats = createAsyncThunk<PaginatedResponse<Chat>, ChatRequest>(
  'chats/fetchChats',
  async (chatRequest: ChatRequest, { rejectWithValue }) => {
    try {
      const response = await getChats(chatRequest);
      console.log('fetch chat', response.data)
      return response;
    }  catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch chats');
    }
  }
);
