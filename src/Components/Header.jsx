import { Link } from "react-router-dom";
import Drawer from "./Utils/Drawer";
const Header = () => {
    return ( 
        <header className="bg-primary">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container justify-content-between gap-3">
                    <Link to={"/products"}><h1 className="text-light">CRUD OF PRODUCTS - React, Redux and RESTAPI</h1></Link>
                    <Drawer/>
                </div>
            </nav>
        </header>);
}

export default Header;