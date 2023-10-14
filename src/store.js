import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./components/inputSlice";
import sortReducer from "./components/sortSlice";

const store = configureStore({
  reducer: {
    search: inputReducer,
    sort: sortReducer,
  },
});

export default store;
