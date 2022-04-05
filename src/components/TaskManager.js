import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { updateState } from "../features/TaskSlice";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskItems from "./TaskItems";

function TaskManager() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();
  const [managerMode, setManagerMode] = useState(true);
  const [subtaskName, setSubtaskName] = useState();
  const [warning, setWarning] = useState(null);
  const [subTaskContent, setSubtaskContent] = useState(null);

  const taskModeHandler = () => {
    setManagerMode(true);
  };

  const subtaskModeHandler = () => {
    setManagerMode(false);
  };

  const subTaskInputHandler = (e) => {
    const value = e.target.value;
    if (e.target.value.length > 5) {
      setSubtaskContent(value);
    } else {
      setWarning("Requires minimum of 5 characters");
    }
  };

  const addSubTask = (value) => {
    if (subTaskContent) {
      let subTaskObject = {};
      subTaskObject.for = value;
      subTaskObject.content = subTaskContent;
      subTaskObject.completed = false;

      dispatch(
        updateState({
          ...tasks,
          subTaskList: [...tasks.subTaskList, subTaskObject],
        })
      );
    }
  };

  if (managerMode) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="div">
          Task Manager
        </Typography>
        {tasks && tasks.toDoList.length < 1 ? (
          <Button
            variant="outlined"
            endIcon={<PriorityHighIcon />}
            sx={{ mt: 2 }}
          >
            Please add a repository from the list
          </Button>
        ) : (
          tasks.toDoList.map((item) => (
            <List
              key={item.name}
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
            >
              <ListItemButton>
                <ListItemIcon>{tasks.toDoList.indexOf(item) + 1}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`${
                    tasks.subTaskList.filter(
                      (subtaskListItem) => subtaskListItem.for === item.name
                    ).length
                  } Subtasks`}
                />
                <Button
                  onClick={() => {
                    subtaskModeHandler();
                    setSubtaskName(item.name);
                  }}
                  variant="outlined"
                  endIcon={<AssignmentIcon />}
                >
                  Manage Subtasks
                </Button>
              </ListItemButton>
            </List>
          ))
        )}
      </Box>
    );
  }

  if (managerMode !== "") {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="div">
          {subtaskName} Subtasks
        </Typography>
        {tasks.subTaskList.filter((item) => item.for === subtaskName).length >
        0 ? (
          <List>
            {tasks.subTaskList
              .filter((item) => item.for === subtaskName)
              .map((item) => (
                <TaskItems
                  key={tasks.subTaskList.indexOf(item) + 1}
                  item={item}
                  completed={item.completed}
                />
              ))}
          </List>
        ) : null}
        <Box sx={{ mt: 2, display: "flex" }}>
          <TextField
            id="outlined-basic"
            label="Add Task"
            name="subtask"
            multiline
            maxRows={4}
            sx={{ minWidth: "300px" }}
            variant="outlined"
            onChange={subTaskInputHandler}
            helperText={warning ? warning : null}
          />
          <Button
            onClick={() => addSubTask(subtaskName)}
            startIcon={<AddCircleIcon />}
            variant="outlined"
            sx={{ ml: 1, maxHeight: "56px" }}
          >
            Add Subtask
          </Button>
        </Box>
        <Button
          variant="outlined"
          onClick={taskModeHandler}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to list
        </Button>
      </Box>
    );
  }
}

export default TaskManager;
