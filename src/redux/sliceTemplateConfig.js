import { createSlice } from "@reduxjs/toolkit";

export const sliceTemplateConfig = createSlice({
    name: "sliceTemplateConfig",
    initialState: null,
    reducers: {
        setTemplateConfig: (state, action) => {
            state.config = action.payload;
        },
    },
});

export const { setTemplateConfig } = sliceTemplateConfig.actions;

export default sliceTemplateConfig.reducer;
