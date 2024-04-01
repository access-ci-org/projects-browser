import { configureStore } from "@reduxjs/toolkit";
import browserSlice from "./browserSlice";

export const store = configureStore({
  reducer: {
    projectsBrowser: browserSlice
  }
});