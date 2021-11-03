import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRequestAction } from '../../Actions/ActionsRequests'
const Requests = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const loadRequests = () => dispatch(getRequestAction());
        loadRequests();
    }, [dispatch])
    const { requests } = useSelector(state => state.request);
    console.log(requests);
    return ( 
    <>
        <h2>Requests</h2>
    </> );
}
 
export default Requests;