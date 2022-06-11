import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// declaring the types for our state
export type CounterState = {
  walletAddress: string;
};

const initialState: CounterState = {
  walletAddress: "",
};

export const counterSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setWalletAddress } = counterSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getWalletAddress = (state: RootState) =>
  state.crypto.walletAddress;

// exporting the reducer here, as we need to add this to the store
export default counterSlice.reducer;
