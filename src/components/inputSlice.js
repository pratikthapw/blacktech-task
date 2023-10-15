import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValuePhoto: "momo",
  inputValueAppoint: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    addInputPhoto(state, action) {
      state.inputValuePhoto = action.payload;
    },
    addInputAppoint(state, action) {
      state.inputValueAppoint = action.payload;
    },
  },
});

export const { addInputPhoto, addInputAppoint } = inputSlice.actions;
export default inputSlice.reducer;
