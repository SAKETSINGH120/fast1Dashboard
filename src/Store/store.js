import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./LoaderSlice";
import SnackbarSlice from "./SnackbarSlice";


export const store = configureStore({
    reducer: {
        loader: loaderSlice.reducer,
        snackbar: SnackbarSlice,
    },
});