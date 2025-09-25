import React, { useEffect } from 'react'
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact'
import { Link, useNavigate} from 'react-router-dom';
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../redux/api/orderApi';
import AdminLayout from '../layout/AdminLayout';

const OrdersList = () => {
    const { data, isLoading, error} = useGetAdminOrdersQuery();
    const[deleteOrder,{error:deleteError,isLoading:isDeleteLoading,isSuccess:isDeleteSuccess}] = useDeleteOrderMutation()
    const navigate  = useNavigate()
    const setOrders = () =>{
        const orders = {
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                 {
                    label:'Payment Status',
                    field:'paymentStatus',
                    sort:'asc'
                },
                 {
                    label:'Order Status',
                    field:'orderStatus',
                    sort:'asc'
                },
                 {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
                
                

            ],
            rows:[]
        };
        data?.orders?.forEach((item)=>{
            orders.rows.push({
                id:item?._id,
                paymentStatus:item?.paymentInfo?.status?.toUpperCase(),
                orderStatus:item?.orderStatus,
                actions:(
                    <>
                <Link to={`/admin/orders/${item._id}`}  className='btn btn-outline-primary'>
                <i className="fa fa-pencil"></i></Link>
                <button className='ms-2 btn btn-outline-danger' onClick={()=>handleDeleteOrder(item?._id)}>
                <i className="fa fa-trash"></i></button>
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
        if(deleteError){
            toast.error(error?.data?.message)
        }
         if(isDeleteSuccess){
            toast.success("Order Deleted Successfully")
            navigate('/admin/orders')
        }

    },[error,deleteError,isDeleteSuccess]);
     if(isLoading){
        return <Loader/>
      }
      const handleDeleteOrder = (id)=>{
        deleteOrder(id);
      }
  return (
    <AdminLayout>
      <h1 className='my-5' >{data?.orders?.length} Orders</h1>
      <MDBDataTable
      data={setOrders()}
      className='px-3'
      bordered
        striped
        hover
      />
    </AdminLayout>
  )
}

export default OrdersList
