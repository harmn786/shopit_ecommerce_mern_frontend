import React, { useEffect } from 'react'
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import {MDBDataTable} from 'mdbreact'
import { Link, useNavigate} from 'react-router-dom';
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../redux/api/productApi';
import AdminLayout from '../layout/AdminLayout';

const ListProducts = () => {
    const { data, isLoading, error} = useGetAdminProductsQuery();
    const navigate  = useNavigate()
    const [deleteProduct,{isLoading: isDeleteLoading ,error:deleteError ,isSuccess: isDeleteSuccess}] = useDeleteProductMutation()  
    const setProducts = () =>{
        const products = {
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                 {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                 {
                    label:'Stock',
                    field:'stock',
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
        data?.products?.forEach((item)=>{
            products.rows.push({
                id:item._id,
                name:`${item.name.substring(0,20)}...`,
                stock:item.stock,
                actions:(
                    <>
                <Link to={`/admin/products/${item._id}`}  className='btn btn-outline-primary'>
                <i className="fa fa-pencil"></i></Link>
                <Link to={`/admin/products/${item._id}/upload_images`}  className='btn btn-outline-success ms-2'>
                <i className="fa fa-image"></i></Link>
                <button onClick={()=>deleteProductHandler(item._id)} className='ms-2 btn btn-outline-danger'>
                <i className="fa fa-trash"></i></button>
                </>
                )
            })
        })
        return products
    }
    console.log(data);
     useEffect(()=>{
        if(deleteError){
                        toast.error(error?.data?.message)
                    }
        if(error){
            toast.error(error?.data?.message)
        }
        if(isDeleteSuccess){
            toast.success('Product Deleted Successfully')
            navigate('/admin/products')
        }
    },[error,deleteError,isDeleteSuccess]);
     if(isLoading){
        return <Loader/>
      }
      const deleteProductHandler = (id)=>{
        deleteProduct(id)
      }
  return (
    <AdminLayout>
      <h1 className='my-5' >{data?.products?.length} Products</h1>
      <MDBDataTable
      data={setProducts()}
      className='px-3'
      bordered
        striped
        hover
      />
    </AdminLayout>
  )
}

export default ListProducts
