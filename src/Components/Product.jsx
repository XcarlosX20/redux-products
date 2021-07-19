import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {formatAmount} from ".././helpers";
//Redux
import { useDispatch } from 'react-redux';
import {deleteProductAction,getEditProductAction} from "../Actions/ActionsProducts"
const Product = ({ singleProduct }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { productname, price, id } = singleProduct;
    const editProduct = () => {
        dispatch(getEditProductAction(singleProduct));
        history.push(`/product/edit/${id}`);
    }
    const deleteProduct = () => {
        //confirm
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            dispatch(deleteProductAction(id))
            }
          })
    }
    return (
        <tr>
            <td>{productname}</td>
            <td>{formatAmount(price, "$")}</td>
            <td><button className="btn btn-primary" onClick={() => editProduct()}>Edit</button>
                <button className="btn btn-danger"
                onClick={() => deleteProduct()}>Delete</button>
            </td>
        </tr>
    );
}

export default Product;