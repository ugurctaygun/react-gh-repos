import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { updateState } from "../features/TaskSlice";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function TaskManager() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();
  const [managerMode, setManagerMode] = useState(true);
  const [subtaskName, setSubtaskName] = useState();
  const [subTaskContent, setSubtaskContent] = useState({ subtask: "" });

  const taskModeHandler = () => {
    setManagerMode(true);
  };

  const subtaskModeHandler = () => {
    setManagerMode(false);
  };

  const subTaskInputHandler = (e) => {
    const value = e.target.value;
    setSubtaskContent({
      ...subTaskContent,
      [e.target.name]: value,
    });
  };

  if (managerMode) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="div">
          Task Manager
        </Typography>
        {tasks.toDoList.length < 1 ? (
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
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
            >
              <ListItemButton>
                <ListItemIcon>{tasks.toDoList.indexOf(item) + 1}</ListItemIcon>
                <ListItemText primary={item.name} secondary={`${0} Subtasks`} />
                <ListItemIcon
                  onClick={() => {
                    subtaskModeHandler();
                    setSubtaskName(item.name);
                  }}
                >
                  <AssignmentIcon />
                </ListItemIcon>
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
          />
          <Button>
            <AddCircleIcon />
          </Button>
        </Box>
        <Button
          variant="outlined"
          onClick={taskModeHandler}
          startIcon={<PriorityHighIcon />}
          sx={{ mt: 2 }}
        >
          Back to list
        </Button>
      </Box>
    );
  }
}

export default TaskManager;
