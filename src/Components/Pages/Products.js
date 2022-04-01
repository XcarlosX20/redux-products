import { Container } from '@mui/material';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../Actions/ActionsProducts";
import Header from '../Layout/Header';
import Product from '../Products/Product';
import Search from '../Searchbar/Search';
const Products = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loadProducts = () => dispatch(getProductsAction());
        loadProducts();
    }, [dispatch])
    //state products list
    const { products, error, searchResults } = useSelector(state => state.products);
    return (
        <>
        <Header/>
        <Container
         sx={{paddingY: '1.5rem'}}
        maxWidth={'md'} >
            <h3 className="text-center">Listado de productos</h3>
            <Search products={products}/>
            {error ?
                (<div className="alert alert-danger mb-2" role="alert">
                    There was an error loading products
                </div>) : null}
            <div className="table-responsive">
                {searchResults ? 
                (<table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Image:</th>
                        <th scope="col">Name:</th>
                        <th scope="col">Price:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchResults.map(singleProduct => (
                            <Product key={singleProduct._id} singleProduct={singleProduct} />
                        ))
                    }
                </tbody>
            </table>)  
                :
                (<table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Image:</th>
                            <th scope="col">Name:</th>
                            <th scope="col">Price:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(singleProduct => (
                                <Product key={singleProduct._id} singleProduct={singleProduct} />
                            ))
                        }
                    </tbody>
                </table>)}
                {searchResults !== null & searchResults < 1 ? <div className="alert "><p className="text-danger text-center">No results</p></div> : null}
            </div>
        </Container> 
        </>
    );
}

export default Products;