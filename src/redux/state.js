import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./sliceUser";
import reducerTemplate from "./sliceTemplate";
import reducerCatelogue from "./sliceCatelogue";

const state = configureStore({
    reducer: {
        stateUser: reducerUser,
        stateTemplate: reducerTemplate,
        stateCatelogue: reducerCatelogue,
    },
});

export default state;
