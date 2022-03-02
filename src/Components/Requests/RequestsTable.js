import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestAction } from '../../Actions/ActionsRequests'
import { dolarTodayApi } from '../../Services/dolarTodayApi'
import Loading from '../Utils/Loading'
import Order from './Order'
const dialog = {
  zIndex: 10 ,
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'transparent',
};
const RequestsTable = () => {
  const [usdToBs, setUsdToBs] = useState(null)
  const dispatch = useDispatch()
  useEffect(async () => {
    const loadRequests = () => dispatch(getRequestAction())
    loadRequests()
    dolarTodayApi().then((res) => setUsdToBs(res))
  }, [dispatch])
  const { requests, loading } = useSelector((state) => state.request)
  return (
    <>
    {loading ? (
      <Box sx={dialog}>
        <Loading/>
      </Box>
    ) : null}
      {requests.length !== 0
        ? requests.map((order) => (
          <Order
            key={order._id}
            order={order}
            usdToBs={usdToBs}
          />
          ))
        : null}
    </>
  )
}

export default RequestsTable
