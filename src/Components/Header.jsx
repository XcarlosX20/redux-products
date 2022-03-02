import { AddOutlined, Notifications } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "./Utils/Drawer";
const Header = () => {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Container>
        <Grid container direction='row' justifyContent={'space-between'} alignItems="center">
          <Grid item
          justifyContent='flex-start'
          >
            <Link to={"/products"}>
            <h1 className="text-light">Listado de productos</h1>
          </Link>
          </Grid>
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
        </Container>
      </nav>
    </header>
  );
};

export default Header;
