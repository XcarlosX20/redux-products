import { useSelector } from "react-redux";
import { AddOutlined, Notifications } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "../Utils/Drawer";
import { Box } from "@mui/system";
const Header = () => {
  const {companyName} = useSelector(state => state.auth.company) || '';
  return (
    <Box color={'dark.main'} sx={{backgroundColor:'dark.main'}}>
      <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Container>
        <Grid container direction='row' justifyContent={'space-between'} alignItems="center">
          <Grid item
          justifyContent='flex-start'
          >
            <Link to={"/products"}>
            <h1 className="text-light">{companyName}</h1>
          </Link>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
            <Link to={"/product/new"}>
              <Button color={"light"}>
                <AddOutlined  />
                <Typography>Product</Typography>
              </Button>
            </Link>
            <Button color={"light"}>
              <Notifications />
            </Button>
            <Drawer />
          </Grid>
        </Grid>
        </Container>
      </nav>
    </header>
    </Box>
  );
};

export default Header;
