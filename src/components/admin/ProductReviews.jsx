import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useDeleteReviewMutation, useLazyGetProductReviewsQuery } from '../../redux/api/productApi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'

const ProductReviews = () => {
    const [productId,setProductId] = useState('')
    const [getProductReviews,{data,error,isLoading}]= useLazyGetProductReviewsQuery()
    const[deleteReview,{error:deleteError,isLoading:isDeleteLoading,isSuccess:isDeleteSuccess}] = useDeleteReviewMutation()
    const setReviews = () =>{
            const reviews = {
                columns:[
                    {
                        label:'ID',
                        field:'id',
                        sort:'asc'
                    },
                     {
                        label:'Rating',
                        field:'rating',
                        sort:'asc'  
                    },
                     {
                        label:'Comment',
                        field:'comment',
                        sort:'asc'
                    },
                    {
                        label:'User',
                        field:'user',
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
            data?.reviews?.forEach((item)=>{
                reviews.rows.push({
                    id:item?._id,
                    rating:item?.rating,
                    comment:item?.comment.substring(0,5)+'....',
                    user:item?.user?.name,
                    actions:(
                        <>
                    <Link to={`/admin/reviews/${item._id}`}  className='btn btn-outline-primary'>
                    <i className="fa fa-pencil"></i></Link>
                    <button className='ms-2 btn btn-outline-danger' onClick={()=>handleDeleteReview(item._id)}>
                    <i className="fa fa-trash"></i></button>
                    </>
                    )
                })
            })
            return reviews
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
                toast.success("Review Deleted Successfully")
            }
    
        },[error,deleteError,isDeleteSuccess]);
         if(isLoading){
            return <Loader/>
          }
          const submitHandler = (e)=>{
            e.preventDefault()
            getProductReviews(productId);
          }
          const handleDeleteReview = (id)=>{
            deleteReview({productId,id})
          }
  return (
 <AdminLayout>
       <div className="row justify-content-center my-5">
      <div className="col-6">
        <form>
          <div className="mb-3">
            <label htmlFor="productId_field" className="form-label">
              Enter Product ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={productId}
              onChange={(e)=>setProductId(e.target.value)}
            />
          </div>

          <button
            id="search_button"
            type="submit"
            className="btn btn-primary w-100 py-2"
            onClick={submitHandler}
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
    {data?.reviews?.length>0 ?
    (<MDBDataTable
      data={setReviews()}
      className='px-3'
      bordered
        striped
        hover
      />):<p className='mt-5 text-center'>No Reviews available</p>
    }
     
     </AdminLayout>
  )
}

export default ProductReviews
