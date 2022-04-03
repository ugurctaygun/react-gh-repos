import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function TaskItems({ item, uid }) {
  const labelId = `checkbox-list-secondary-label-${item.for}`;
  return (
    <ListItem
      key={item.for}
      secondaryAction={
        <Checkbox
          edge="end"
          //   onChange={handleToggle(uid)}
          //   checked={checked.indexOf(uid) !== -1}
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
