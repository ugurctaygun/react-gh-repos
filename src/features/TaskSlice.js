import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: {
      isAuthenticated: false,
      accessToken: null,
      toDoList: [],
      subTaskList: [],
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
