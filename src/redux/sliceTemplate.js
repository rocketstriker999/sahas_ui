import { createSlice } from "@reduxjs/toolkit";

export const sliceTemplate = createSlice({
    name: "sliceTemplate",
    initialState: {},
    reducers: {
        setTemplate: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { setTemplate } = sliceTemplate.actions;

export default sliceTemplate.reducer;
