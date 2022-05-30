import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import cryptoReducer from "./slices/crypto";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
