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
        removeRole: (state, action) => {
            state.global.roles = state.global.roles.filter((role) => role.id !== action?.payload);
        },
        addRole: (state, action) => {
            state.global.roles = [action?.payload, ...state.global.roles];
        },
    },
});

export const { setTemplateConfig, removeAuthority, removeRole, addAuthority, addRole } = sliceTemplateConfig.actions;

export default sliceTemplateConfig.reducer;
