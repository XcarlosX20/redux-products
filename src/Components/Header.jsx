import { AddOutlined, Notifications } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "./Utils/Drawer";
const Header = () => {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Grid container direction='row' alignItems="center" justifyContent={'space-between'}>
          <Link to={"/products"}>
            <h1 className="text-light">Listado de productos</h1>
          </Link>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
            <Link to={"/product/new"}>
              <Button>
                <AddOutlined color="primary" />
                <Typography>Product</Typography>
              </Button>
            </Link>
            <Button>
              <Notifications />
            </Button>
            <Drawer />
          </Grid>
        </Grid>
      </nav>
    </header>
  );
};

export default Header;
