import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: {
      isAuthenticated: false,
      tasks: null,
    },
  },
  reducers: {
    updateState: (state, action) => {
      state.value = { ...action.payload };
    },
  },
});

export const { updateState } = taskSlice.actions;

export default taskSlice.reducer;
