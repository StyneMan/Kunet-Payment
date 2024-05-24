import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./reducers/loader";
import redeemReducer from "./reducers/redeem";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    redeem: redeemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
