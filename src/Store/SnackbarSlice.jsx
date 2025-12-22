import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    detail: "",
    severity: "",
};

const snackbarSlice = createSlice({
    name: 'snakbar',
    initialState,
    reducers: {
        success: (state, action) => {
            state.show = action.payload.show;
            state.detail = action.payload.msg;
            state.severity = 'success';
        },
        error: (state, action) => {
            state.show = action.payload.show;
            state.detail = action.payload.msg;
            state.severity = 'error';
        },
        info: (state, action) => {
            state.show = action.payload.show;
            state.detail = action.payload.msg;
            state.severity = 'info';
        },
    },
});

export const { success, error, info } = snackbarSlice.actions;
export default snackbarSlice.reducer;