import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestAction } from '../../Actions/ActionsRequests'
import { dolarTodayApi } from '../../Services/dolarTodayApi'
import Order from './Order'
const RequestsTable = () => {
  const [usdToBs, setUsdToBs] = useState(null)
  const dispatch = useDispatch()
  useEffect(async () => {
    const loadRequests = () => dispatch(getRequestAction())
    loadRequests()
    dolarTodayApi().then((res) => setUsdToBs(res))
  }, [dispatch])
  const { requests } = useSelector((state) => state.request)
  return (
    <>
      {requests.length !== 0
        ? requests.map((order) => (
          <Order
            key={order.number_proof_payment}
            order={order}
            usdToBs={usdToBs}
          />
          ))
        : null}
    </>
  )
}

export default RequestsTable
