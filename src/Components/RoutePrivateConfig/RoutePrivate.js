import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Route, Redirect} from "react-router";
import Loading from '../Utils/Loading'
import { getCompanyAction } from '../../Actions/ActionsAuth';
import io from "socket.io-client";
const PrivateRoute = ({component: Component, ...props}) => {
    let dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    const token = localStorage.getItem('token');
    useEffect(() => {  
       const authCompany = async() => {
           await dispatch(getCompanyAction(token))
           setMounted(true)
        }
        authCompany();    
        const socket = io("http://localhost:4000");
        socket.emit('notifications', {
            message: 'Hello',
            username: 'World'
          });
    }, [dispatch])
    const {auth} = useSelector(state => state.auth)
    if (!mounted) return <Loading />
    return ( 
        <Route {...props} render={props => !auth ? 
            (<Redirect to="/login"/>) : (<Component {...props}/>)}/>
     );
}
 
export default PrivateRoute;