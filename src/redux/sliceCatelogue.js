import { createSlice } from "@reduxjs/toolkit";

export const sliceCatelogue = createSlice({
    name: "sliceCatelogue",
    initialState: {},
    reducers: {
        setCatelogue: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { setCatelogue } = sliceCatelogue.actions;

export default sliceCatelogue.reducer;
