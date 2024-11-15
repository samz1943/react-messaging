import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from '../actions/messageActions';

interface MessageState {
  messages: any[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const initialState: MessageState = {
  messages: [],
  loading: 'idle',
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

const postSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.messages = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postSlice.reducer;
