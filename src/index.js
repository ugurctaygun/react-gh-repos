import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { loadState, saveState } from "./features/LocalStorage";
import taskReducer from "./features/TaskSlice";
import { updateState } from "./features/TaskSlice";
import App from "./App";

const persistedState = loadState();

const store = configureStore({
  persistedState,
  reducer: {
    tasks: taskReducer,
  },
});

if (persistedState) {
  let { isAuthenticated, toDoList, accessToken, subTaskList } =
    persistedState.tasks.value;
  store.dispatch(
    updateState({
      isAuthenticated: isAuthenticated,
      toDoList: toDoList,
      accessToken: accessToken,
      subTaskList: subTaskList,
    })
  );
}

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
