import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Route, Redirect} from "react-router";
import Loading from '../Utils/Loading'
import { getCompanyAction } from '../../Actions/ActionsAuth';
const PrivateRoute = ({component: Component, ...props}) => {
    let dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
       const authCompany = () => dispatch(getCompanyAction(token))
        authCompany()
    }, [dispatch])
    const {auth} = useSelector(state => state.auth)
    return ( 
        <Route {...props} render={props => !auth ? 
            (<Loading auth={auth}/>) : (<Component {...props}/>)}/>
     );
}
 
export default PrivateRoute;