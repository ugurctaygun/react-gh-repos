import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  anchor: {
    cursor: "pointer !important",
  },
  flexDiv: {
    display: "flex",
  },
});

function RepoShowcase() {
  const classes = useStyles();
  const tasks = useSelector((state) => state.tasks.value);
  const [gitData, setGitData] = useState({ data: null, repos: null });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await axios.get("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${tasks.accessToken}` },
        });
        const repoInfo = await axios.get("https://api.github.com/user/repos", {
          headers: { Authorization: `Bearer ${tasks.accessToken}` },
        });
        setGitData({ data: userInfo.data, repos: repoInfo.data });
      } catch (error) {
        console.error(error.message);
      }
      // setLoading(false);
    };

    fetchData();
  }, []);
  console.log(gitData);

  if (gitData.data === null) {
    return <Spinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="div" className={classes.flexDiv}>
        <Avatar sx={{ mr: 2 }} alt="Remy Sharp" src={gitData.data.avatar_url} />
        {gitData.data.login}'s Repositories
      </Typography>
      <div>
        <List>
          {gitData.repos.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="add">
                  <AddCircleIcon />
                </IconButton>
              }
            >
              <a
                href={item.html_url}
                target="_blank"
                className={classes.anchor}
                rel="noreferrer"
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
              </a>

              <ListItemText primary={item.name} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
}

export default RepoShowcase;
