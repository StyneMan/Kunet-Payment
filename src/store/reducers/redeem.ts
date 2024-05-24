/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LoaderState {
  redeemData: any;
  voucherInfo: any;
  transactionId: string;
}

// Define the initial state using that type
const initialState: LoaderState = {
  redeemData: null,
  transactionId: "",
  voucherInfo: null,
};

export const redeemSlice = createSlice({
  name: "redeem",
  initialState,
  reducers: {
    setRedeemData: (state, action: PayloadAction<any>) => {
      state.redeemData = action.payload;
    },
    setVoucherInfo: (state, action: PayloadAction<any>) => {
      state.voucherInfo = action.payload;
    },
    setTransactionID: (state, action: PayloadAction<string>) => {
      state.transactionId = action.payload;
    },
  },
});

export const { setRedeemData, setTransactionID, setVoucherInfo } = redeemSlice.actions;

// export const getLoading = (state: RootState) => state.loader.isLoading;

export default redeemSlice.reducer;
