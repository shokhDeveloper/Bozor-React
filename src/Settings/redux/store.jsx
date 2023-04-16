import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./RootReducer";

export const store = configureStore({
    reducer: RootReducer
})