import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./sliceUser";
import reducerConfigs from "./sliceConfigs";

const state = configureStore({
    reducer: {
        stateUser: reducerUser,
        stateConfigs: reducerConfigs,
    },
});

export default state;
