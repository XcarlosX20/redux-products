import { Link } from "react-router-dom";
const Header = () => {
    return ( 
        <header className="bg-primary">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container justify-content-between gap-3">
                    <Link to={"/"}><h1 className="text-light">CRUD OF PRODUCTS - React, Redux and RESTAPI</h1></Link>
                    <Link className="btn btn-danger nuevo-post d-block d-md-inline-block"
                        to={"/product/new"}>Add product &#43;</Link>
                </div>
            </nav>
        </header>);
}

export default Header;