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
import Inventory from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import { useHistory } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import { logoutAction } from "../../Actions/ActionsAuth";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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
        <NavLink to={"/orders"}>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>
        </NavLink>
        <NavLink to={"/products"}>
          <ListItem button>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary={'Products'}>
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink to={"/customization/sales-summary"}>
          <ListItem button>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary={'Summary of sales'}>
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink exact to={"/customization"}>
          <ListItem button>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary={'Customatization'}>
            </ListItemText>
          </ListItem>
        </NavLink>
        <ListItem>
          <Button
            onClick={() => {
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
      <Button color={"light"} onClick={toggleDrawer(anchor, true)}>
        <Menu />
      </Button>
      <SwipeableDrawer sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
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
