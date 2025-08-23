import { createSlice } from "@reduxjs/toolkit";

export const sliceTemplateConfig = createSlice({
    name: "sliceTemplateConfig",
    initialState: null,
    reducers: {
        setTemplateConfig: (state, action) => action?.payload,
        removeAuthority: (state, action) => {
            state.global.authorities = state.global.authorities.filter((authority) => authority.id !== action?.payload);
        },
        addAuthority: (state, action) => {
            state.global.authorities = [action?.payload, ...state.global.authorities];
        },
    },
});

export const { setTemplateConfig, removeAuthority, addAuthority } = sliceTemplateConfig.actions;

export default sliceTemplateConfig.reducer;
