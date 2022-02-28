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
import { Link } from "react-router-dom";
import Inventory from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import { useHistory } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import { logoutAction } from "../../Actions/ActionsAuth";
import { useDispatch } from "react-redux";

export default function Drawer() {
  let dispatch = useDispatch();
  let history = useHistory();
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
        <Link to={"/orders"}>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>
        </Link>
        <Link to={"/products"}>
          <ListItem button>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText>
              <Link to={"/products"}>Products</Link>
            </ListItemText>
          </ListItem>
        </Link>
        <ListItem>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(logoutAction())
              history.push("/login");
            }}
          >
            Log out
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  const anchor = "left";
  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>
        <Menu />
      </Button>
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
