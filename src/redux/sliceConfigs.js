import { createSlice } from "@reduxjs/toolkit";

export const sliceConfigs = createSlice({
    name: "sliceConfigs",
    initialState: null,
    reducers: {
        setConfigs: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setConfigs } = sliceConfigs.actions;

export default sliceConfigs.reducer;
