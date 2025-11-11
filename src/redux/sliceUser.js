import { createSlice } from "@reduxjs/toolkit";

export const sliceUser = createSlice({
    name: "sliceUser",
    initialState: null,
    reducers: {
        removeCurrentUser: (state) => null,
        setCurrentUser: (state, action) => action.payload,
        addDigitallyEnrolledCourse: (state, action) => ({ ...state, digitallyEnrolledCourses: [...state?.digitallyEnrolledCourses, action.payload] }),
    },
});

export const { setCurrentUser, removeCurrentUser, addDigitallyEnrolledCourse } = sliceUser.actions;

export default sliceUser.reducer;
