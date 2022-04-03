import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import { signInWithGitHub } from "../features/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../features/TaskSlice";

const useStyles = makeStyles({
  container: {
    minWidth: "100%",
    minHeight: "90vh",
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    textAlign: "center",
  },
});

function Login() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.value);
  const classes = useStyles();
  const clickHandler = () => {
    dispatch(
      updateState({
        ...tasks,
        isAuthenticated: "testo",
      })
    );
  };
  return (
    <Container className={classes.container}>
      <Card className={classes.card} sx={{ maxWidth: 380, p: 5, m: "auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Github Repository Task Manager
          </Typography>
        </CardContent>
        <Button
          onClick={clickHandler}
          variant="outlined"
          startIcon={<GitHubIcon />}
        >
          Sign In With GitHub
        </Button>
      </Card>
    </Container>
  );
}

export default Login;
