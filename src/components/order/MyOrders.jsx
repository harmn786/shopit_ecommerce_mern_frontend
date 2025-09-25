import React, { useEffect } from 'react'
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact'
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrders = () => {
    const dispatch = useDispatch()
    const { data, isLoading, error} = useMyOrdersQuery();
    const [searchParams] = useSearchParams()
    const orderSuccess = searchParams.get("order_success")
    const setOrders = () =>{
        const orders = {
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                 {
                    label:'Amount Paid',
                    field:'amount',
                    sort:'asc'
                },
                 {
                    label:'Payment Status',
                    field:'status',
                    sort:'asc'
                },
                 {
                    label:'Order Status',
                    field:'orderStatus',
                    sort:'asc'
                }
                ,
                 {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
                
                

            ],
            rows:[]
        };
        data?.order?.forEach((item)=>{
            orders.rows.push({
                id:item._id,
                amount:`$${item.totalAmount}`,
                status:item.paymentInfo?.status?.toUpperCase(),
                orderStatus:item.orderStatus,
                actions:(
                    <>
                <Link to={`/order/${item._id}`}  className='btn btn-primary'>
                <i className="fa fa-eye"></i></Link>
                <Link to={`/invoice/order/${item._id}`}  className='ms-2 btn btn-success'>
                <i className="fa fa-print"></i></Link>
                </>
                )
            })
        })
        return orders
    }
    console.log(data);
     useEffect(()=>{
        if(error){
            toast.error(error?.data?.message)
        }
        if(orderSuccess){
            dispatch(clearCart());

        }
    },[error]);
     if(isLoading){
        return <Loader/>
      }
  return (
    <div>
      <h1 className='my-5' >{data?.order?.length} Orders</h1>
      <MDBDataTable
      data={setOrders()}
      className='px-3'
      bordered
        striped
        hover
      />
    </div>
  )
}

export default MyOrders
