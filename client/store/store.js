// import { configureStore } from "@reduxjs/toolkit"
// import taskReducer from "../src/features/taskSlice"

// const store = configureStore({
//     reducer: {
//         tasks: taskReducer
//     }
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../src/features/taskSlice";
import authReducer from "../src/features/authSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;