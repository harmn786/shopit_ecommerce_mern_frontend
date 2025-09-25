import React, { useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

const ProcessOrder = () => {
     const params = useParams();
     const [status,setStatus] = useState("")
         const { data} = useOrderDetailsQuery(params?.id);
         const order = data?.order || {};
         const[updateOrder,{error,isLoading,isSuccess}] = useUpdateOrderMutation()
         const {shippingInfo,orderItems,paymentInfo,user, totalAmount,orderStatus,paymentMethod} = order;
         useEffect(()=>{
              if(orderStatus){
                setStatus(orderStatus)
            }
         },[orderStatus])
          useEffect(()=>{
                 if(error){
                     toast.error(error?.data?.message)
                 }
                 if(isSuccess){
                    toast.success('Order Updated Successfully')
                 }
             },[error,isSuccess]);
             if(isLoading){
            return <Loader/>
          }
          const updateOrderHandler = (id)=>{
            const statusData  = {status}
            updateOrder({id,body:statusData})
          }
  return (
   <AdminLayout>
      <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-8 order-details">
        <h3 className="mt-5 mb-4">Order Details</h3>

        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td className={`${order?.orderStatus}`.includes("Delivered") ? "greenColor" : "redColor"}>
                <b>{orderStatus}</b>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{shippingInfo?.address}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className={`${paymentInfo?.status}`.includes("PAID") ? "greenColor" : "redColor"}>
                <b>{paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>Nill</td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
        <div className="cart-item my-1">
           {orderItems?.map((item)=>(
                <div className="row">
            <div className="col-4 col-lg-2">
              <img
                src={item?.image}
                alt={item?.name}
                height="45"
                width="65"
              />
            </div>

            <div className="col-5 col-lg-5">
              <a href="/products/product-id">{item?.name}</a>
            </div>

            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>${item?.price}</p>
            </div>

            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>{item?.quantity}Piece(s)</p>
            </div>
            <hr />
          </div>
            ))}
        </div>
      </div>

      <div className="col-12 col-lg-3 mt-5">
        <h4 className="my-4">Status</h4>

        <div className="mb-3">
          <select className="form-select" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" onClick={()=>updateOrderHandler(order?._id)}>Update Status</button>

        <h4 className="mt-5 mb-3">Order Invoice</h4>
        <Link to={`/invoice/order/${order?._id}`} className="btn btn-success w-100">
          <i className="fa fa-print"></i> Generate Invoice
        </Link>
      </div>
    </div>

    </AdminLayout>
  )
}

export default ProcessOrder
