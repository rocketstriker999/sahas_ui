import { createSlice } from '@reduxjs/toolkit';

export const sliceAuth = createSlice({
  name: 'sliceAuth',
  initialState: {
    user: false,
  },
  reducers: {
    removeCurrentUser: (state) => {
      state.user = false;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser, removeCurrentUser} = sliceAuth.actions;

export default sliceAuth.reducer;
