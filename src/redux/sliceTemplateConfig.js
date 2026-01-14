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
        replaceRole: (state, action) => {
            state.global.roles = state?.global?.roles?.map((role) => (action?.payload?.id === role?.id ? action?.payload : role));
        },
        addCarouselImage: (state, action) => {
            state.dash_board.carousel_images.push(action?.payload);
        },
        removeCarouselImage: (state, action) => {
            state.dash_board.carousel_images = state?.dash_board?.carousel_images?.filter(({ id }) => id !== action?.payload);
        },
        updateDashboardDialog: (state, action) => {
            state.dash_board.dialog = { ...state.dash_board.dialog, ...action?.payload };
        },
        setDashboardDialog: (state, action) => {
            state.dash_board.dialog = { ...state.dash_board.dialog, ...action?.payload };
        },

        addChapterType: (state, action) => {
            state.global.chapter_types.push(action?.payload);
        },
        updateChapterTypes: (state, action) => {
            state.global.chapter_types = action?.payload;
        },
    },
});

export const {
    setTemplateConfig,
    removeAuthority,
    removeRole,
    addAuthority,
    addRole,
    replaceRole,
    addCarouselImage,
    removeCarouselImage,
    updateChapterTypes,
    updateDashboardDialog,
    setDashboardDialog,
} = sliceTemplateConfig.actions;

export default sliceTemplateConfig.reducer;
