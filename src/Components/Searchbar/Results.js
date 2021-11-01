import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEditProductAction } from "../../Actions/ActionsProducts";
import { formatAmount } from '../../helpers';
const Results = ({ product }) => {
    const { productname, price, id, img } = product;
    let history = useHistory();
    const dispatch = useDispatch();
    const editProduct = () => {
        dispatch(getEditProductAction(product));
        history.push(`/product/edit/${id}`);
    }
    return (
        <li onClick={editProduct} className="list-group-item list-group-item-action p-3 w-100">
                    <div className="d-flex justify-content-between item-list">
                        <div className="col-sm-2 col-md-4">
                            {img ? (<img className="img-view" loading="lazy" src={img} alt={productname} />) : (<img width="60px" height="60px" className="img-fluid" src="https://res.cloudinary.com/do5yybhwe/image/upload/v1634941979/nophoto-removebg-preview-min_ve6bfv.png" alt={productname}/>)}
                        </div>
                        <div className="col-sm-7 col-md-4">{productname}</div>
                        <div className="col-sm-3 col-md-4"><span className="badge rounded-pill bg-danger font-weight-bolder p-3" style={{margin: "0 auto"}}>{formatAmount(price, "$")}</span></div>
                    </div>
        </li>
    );
}

export default Results;