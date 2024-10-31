import { configureStore } from '@reduxjs/toolkit';
import reducerAuth from './sliceAuth';


const state = configureStore({
  reducer: {
    stateAuth: reducerAuth,

  },
});

export default state;
