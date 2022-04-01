import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {formatAmount} from "../../helpers";
//Redux
import { useDispatch } from 'react-redux';
import {deleteProductAction,getEditProductAction} from "../../Actions/ActionsProducts";
import { Delete, Edit } from '@mui/icons-material';
import {IconButton, Stack } from '@mui/material';
const Product = ({ singleProduct }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { productname, price, _id, img } = singleProduct;
    const editProduct = () => {
        dispatch(getEditProductAction(singleProduct));
        history.push(`/product/edit/${_id}`);
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
            dispatch(deleteProductAction(_id))
            }
          })
    }
    const buttons = () => {
        return(
        <Stack direction="row">
            <IconButton onClick={() => editProduct()}><Edit color='dark'/></IconButton>
            <IconButton color={'error'} onClick={deleteProduct}><Delete/></IconButton>
        </Stack>)
}
    return (
        <tr>
            <td>
                {img ? (<img className="img-view" loading="lazy" src={img} alt={productname} /> ): (<img width="60px" height="60px" className="img-fluid" src="https://res.cloudinary.com/do5yybhwe/image/upload/v1634941979/nophoto-removebg-preview-min_ve6bfv.png" alt={productname}/>) }
            </td>
            <td>{productname}</td>
            <td>
                <Stack direction='column' spacing={3}>
                    <span>{formatAmount(price, "$")}</span>
                    {buttons()}
                </Stack>
            </td>
        </tr>
    );
}

export default Product;