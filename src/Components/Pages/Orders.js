import React from 'react'
import Header from '../Header';
import RequestsTable from '../Requests/RequestsTable'

const Orders = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <h2>Orders</h2>
        <RequestsTable />
      </div>
    </>
  )
}

export default Orders;
