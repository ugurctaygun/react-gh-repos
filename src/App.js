import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RepoShowcase from "./components/RepoShowcase";
import TaskManager from "./components/TaskManager";

const App = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={7}>
        <Paper sx={{ height: "80vh" }} elevation={3} variant="outlined">
          <RepoShowcase />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Paper sx={{ height: "80vh" }} elevation={3} variant="outlined">
          <TaskManager />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default App;
