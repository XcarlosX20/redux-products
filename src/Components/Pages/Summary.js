import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestAction } from '../../Actions/ActionsRequests'
import Side from '../Layout/Side';
import Loading from '../Utils/Loading';
const Summary = () => {
    const dispatch = useDispatch()
    const [totalEarnings, setTotalEarnings] = useState(0);
  useEffect(async () => {
    const loadRequests = () => dispatch(getRequestAction())
    loadRequests()
  }, [dispatch])
  const { requests } = useSelector((state) => state.request)
  //It must develop in API
    // useEffect(() => {
    //     const calculeEarning = () => {
    //         requests.forEach(element => {
    //             let amountOrder = element.amount;
    //             let dateOrder = new Date(element.date);
    //             console.log(today)
    //             setTotalEarnings(totalEarnings + amountOrder )
    //         });
    //     }
    //     calculeEarning()
    // }, [requests])
    
    if(!requests) return <Loading/>
    return ( 
        <Side>
            <p>Summary</p>
            {totalEarnings === 0 ? 'loading' : totalEarnings}
        </Side>
     );
}
 
export default Summary;