import { createSlice } from "@reduxjs/toolkit";

export const sliceCatelogue = createSlice({
    name: "sliceCatelogue",
    initialState: {
        catelogue: undefined,
    },
    reducers: {
        setCatelogue: (state, action) => {
            state.catelogue = action.payload;
        },
    },
});

export const { setCatelogue } = sliceCatelogue.actions;

export default sliceCatelogue.reducer;
