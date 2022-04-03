import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  spinner: {
    minWidth: "100%",
    height: "400px",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Spinner() {
  const classes = useStyles();
  return (
    <Box className={classes.spinner}>
      <CircularProgress />
    </Box>
  );
}
