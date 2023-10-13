import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./components/inputSlice";

const store = configureStore({
  reducer: {
    search: inputReducer,
  },
});

export default store;
