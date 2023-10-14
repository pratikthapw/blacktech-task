import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentData: [],
  sortByType: "pet name",
  sortByOrder: "asc",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    addAppointData(state, action) {
      state.appointmentData = action.payload;
    },
    sortByOrder(state, action) {
      state.sortByOrder = action.payload;
    },
    sortByType(state, action) {
      state.sortByType = action.payload;
    },
  },
});

export const { addAppointData, sortByOrder, sortByType } = sortSlice.actions;
export default sortSlice.reducer;
