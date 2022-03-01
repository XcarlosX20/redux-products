import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Route, Redirect} from "react-router";
import Loading from '../Utils/Loading'
import { getCompanyAction } from '../../Actions/ActionsAuth';
const PrivateRoute = ({component: Component, ...props}) => {
    const [mounted, setMounted] = useState(false)
    let dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(async() => {  
       const authCompany = () => dispatch(getCompanyAction(token))
        await authCompany()
        setMounted(true)
    }, [dispatch, !mounted])
    const {auth} = useSelector(state => state.auth)
    return ( 
        <>
        {mounted ? 
        <Route {...props} render={props => !auth ? 
            (<Redirect to="/login"/>) : (<Component {...props}/>)}/>
        : null}
        </>
     );
}
 
export default PrivateRoute;