import { createSlice } from "@reduxjs/toolkit";

export const sliceUser = createSlice({
    name: "sliceUser",
    initialState: null,
    reducers: {
        removeCurrentUser: (state) => null,
        setCurrentUser: (state, action) => action.payload,
    },
});

export const { setCurrentUser, removeCurrentUser } = sliceUser.actions;

export default sliceUser.reducer;
