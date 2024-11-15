import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../reduce/authSlice';
import chatSlice from '../reduce/chatSlice';
import messageSlice from '../reduce/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
