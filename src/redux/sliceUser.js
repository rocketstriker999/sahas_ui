import { createSlice } from "@reduxjs/toolkit";

export const sliceUser = createSlice({
    name: "sliceUser",
    initialState: {
        user: undefined,
    },
    reducers: {
        removeCurrentUser: (state) => {
            state.user = undefined;
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setCurrentUser, removeCurrentUser } = sliceUser.actions;

export default sliceUser.reducer;
