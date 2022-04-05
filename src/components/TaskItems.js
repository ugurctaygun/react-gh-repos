import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { updateState } from "../features/TaskSlice";
import { useSelector, useDispatch } from "react-redux";

function TaskItems({ item, completed }) {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();
  const labelId = `checkbox-list-secondary-label-${item.for}`;
  // const [checkStatus, setCheckedStatus] = useState(false);
  // const checkedState = (prop) => {
  //   let currentTask = tasks.subTaskList
  //     .filter((subtask) => subtask.for === prop.for)
  //     .shift();
  //   let currentTaskIndex = tasks.subTaskList.indexOf(currentTask);
  //   setCheckedStatus(tasks.subTaskList[currentTaskIndex].completed);
  // };

  // useEffect(() => {
  //   checkedState(item);
  // }, [tasks]);

  const handleToggle = (uid) => {
    dispatch(
      updateState({
        ...tasks,
        subTaskList: tasks.subTaskList.map((item) =>
          item.content === uid ? { ...item, completed: !item.completed } : item
        ),
      })
    );
  };
  return (
    <ListItem
      sx={completed && { textDecoration: "line-through" }}
      key={item.for}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => {
            handleToggle(item.content);
          }}
          checked={completed}
          inputProps={{ "aria-labelledby": labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemText id={labelId} primary={item.content} />
      </ListItemButton>
    </ListItem>
  );
}

export default TaskItems;
