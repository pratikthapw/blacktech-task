import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    addInputValue(state, action) {
      state.inputValue = action.payload;
    },
  },
});

export const { addInputValue } = inputSlice.actions;
export default inputSlice.reducer;
