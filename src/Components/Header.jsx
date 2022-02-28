import { AddOutlined, Notifications } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Drawer from "./Utils/Drawer";
const Header = () => {
  return (
    <header className="bg-primary">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container justify-content-between gap-3">
          <Link to={"/products"}>
            <h1 className="text-light">Listado de productos</h1>
          </Link>
          <div className="d-flex justify-content-end">
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
