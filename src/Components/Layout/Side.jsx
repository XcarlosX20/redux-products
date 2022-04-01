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
import Categories from "../Pages/custom/Categories";
import Mycompany from "../Pages/custom/Mycompany";
import Header from "./Header";
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toPathName from "../../Hooks/toFormatPath";
const Side = (props) => {
  //let {pathname} = useLocation()
  let history = useHistory()
  let options = ["categories", "my company", "Sales summary", "drafts"];
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
          <Toolbar sx={{ height: "150px"}} />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {options.map((text) => (
                  <ListItem button key={text} onClick={()=> history.push(`/customization/${toPathName(text)}`)}>
                    <ListItemText primary={text} />
                  </ListItem>     
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
