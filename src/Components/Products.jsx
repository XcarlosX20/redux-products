import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getProductsAction } from "../Actions/ActionsProducts";
import Product from './Product';
const Products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const loadProducts = () => dispatch(getProductsAction());
        loadProducts();
    }, [dispatch])
    //state products list
    const { products, error } = useSelector(state => state.products);
    console.log(products);
    return (
        <div className="container">
            <h2 className="text-center my-4">Products List</h2>
            {error ?
                (<div class="alert alert-danger mb-2" role="alert">
                    There was an error loading products
                </div>) : null}
            <div className="table-responsive">
                {products.length <= 0 ? (
                    <div className="text-center p-5">
                    <p>you don't have any added product. <br />
                    add your first product</p>
                    <Link className="btn btn-danger nuevo-post d-block d-md-inline-block"
                        to={"/product/new"}>Add  &#43;</Link>
                    </div>
                ):
                (<table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Image:</th>
                            <th scope="col">Name:</th>
                            <th scope="col">Price:</th>
                            <th scope="col">Actions :</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(singleProduct => (
                                <Product key={singleProduct.id} singleProduct={singleProduct} />
                            ))
                        }
                    </tbody>
                </table>)}
            </div>
        </div>

    );
}

export default Products;