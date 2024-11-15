import { createSlice } from '@reduxjs/toolkit';
import { fetchChats } from '../actions/chatActions';

interface ChatState {
  chats: any[];
  selectedChat: any | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  loading: 'idle',
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.chats = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postSlice.reducer;
