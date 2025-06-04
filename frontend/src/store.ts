import { configureStore } from "@reduxjs/toolkit";
import { blogApiSlice } from "./features/api/blogApiSlice";
import { userApiSlice } from "./features/api/userApiSlice";

export const store = configureStore({
    reducer: {
        [blogApiSlice.reducerPath]: blogApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApiSlice.middleware, userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
