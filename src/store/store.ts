import discussionReducer from '../slice/discussionSlice/discussionSlice';

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice/authSlice';

export const store = configureStore({
    reducer: {
        discussion: discussionReducer,
        auth: authReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;