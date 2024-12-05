import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./sliceUser";

const state = configureStore({
    reducer: {
        stateUser: reducerUser,
    },
});

export default state;
