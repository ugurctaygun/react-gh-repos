import React from "react";
import { signInWithGitHub } from "../utility/Firebase";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";

function SignInButton() {
  const clickHandler = () => {
    signInWithGitHub();
  };
  return <Button onClick={clickHandler}>Sign In</Button>;
}

export default SignInButton;
