import * as React from "react";
import {
  Box,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {Link} from 'react-router-dom'
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useHistory } from "react-router-dom";

export default function Drawer() {
  let history = useHistory()
  const [state, setState] = React.useState({
    top: false,
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>

            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItemText>
          <Link to={"/products"}>Products</Link>
          <Link to={"/orders"}>Orders</Link>
          <Button onClick={()=> {localStorage.removeItem('token'); history.push('/login')}}>Log out</Button>
        </ListItemText>
      </List>
    </Box>
  );
  const anchor = 'left'
  return (
    <div>
          <Button onClick={toggleDrawer(anchor, true)}>MENU</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
    </div>
  );
}
