import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./sliceUser";
import reducerCatelogue from "./sliceCatelogue";

const state = configureStore({
    reducer: {
        stateUser: reducerUser,
        stateCatelogue: reducerCatelogue,
    },
});

export default state;
