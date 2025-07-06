import { createSlice } from "@reduxjs/toolkit";

export const sliceProductsCatelogue = createSlice({
    name: "sliceProductsCatelogue",
    initialState: null,
    reducers: {
        setProductsCatelogue: (state, action) => action.payload,
    },
});

export const { setProductsCatelogue } = sliceProductsCatelogue.actions;

export default sliceProductsCatelogue.reducer;
