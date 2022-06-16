import react from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { AppBar } from "@mui/material";
import { NavLink } from "react-router-dom";
import toPathName from "../../Hooks/toFormatPath";
const Side = (props) => {
  let options = ["categories", "work schedules", "my company", "Sales summary"];
  const mobile = useMediaQuery("(max-width:768px)");
  const drawerWidth = mobile ? 150 : 240;
  return (
    <>
      <AppBar position="fixed">
        <Header />
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 5,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar sx={{ height: "150px" }} />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {options.map((text) => (
                <NavLink
                  to={"/customization/" + toPathName(text)}
                  activeStyle={{
                    backgroundColor: "#f1f1f1",
                  }}
                >
                  <ListItem
                    button
                    key={text}
                    sx={{ backgroundColor: "inherit" }}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                </NavLink>
              ))}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar sx={{ height: "150px" }} />
          <main>{props.children}</main>
        </Box>
      </Box>
    </>
  );
};
export default Side;
