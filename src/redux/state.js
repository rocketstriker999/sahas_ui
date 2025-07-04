import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./sliceUser";
import reducerTemplateConfig from "./sliceTemplateConfig";
import reducerProductsCatelogue from "./sliceProductsCatelogue";

const state = configureStore({
    reducer: {
        stateUser: reducerUser,
        stateTemplateConfig: reducerTemplateConfig,
        stateProductsCatelogue: reducerProductsCatelogue,
    },
});

export default state;
