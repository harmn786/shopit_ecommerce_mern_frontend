import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../admin/Dashboard'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'
import UpdateProduct from '../admin/UpdaterProduct'
import UploadImages from '../admin/UploadImages'
import OrdersList from '../admin/OrdersList'
import ProcessOrder from '../admin/ProcessOrder'
import ListUsers from '../admin/ListUsers'
import UpdateUser from '../admin/UpdateUser'
import ReviewsList from '../reviews/ReviewsList'
import ProductReviews from '../admin/ProductReviews'

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/dashboard" element={
        <ProtectedRoute admin={true}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/products" element={
        <ProtectedRoute admin={true}>
          <ListProducts />
        </ProtectedRoute>
      } />
       <Route path="/admin/product/new" element={
        <ProtectedRoute admin={true}>
          <NewProduct />
        </ProtectedRoute>
      } />
      <Route path="/admin/products/:id" element={
        <ProtectedRoute admin={true}>
          <UpdateProduct />
        </ProtectedRoute>
      } />
      <Route path="/admin/products/:id/upload_images" element={
        <ProtectedRoute admin={true}>
          <UploadImages />
        </ProtectedRoute>
      } />
       <Route path="/admin/orders" element={
        <ProtectedRoute admin={true}>
          <OrdersList />
        </ProtectedRoute>
      } />
       <Route path="/admin/orders/:id" element={
        <ProtectedRoute admin={true}>
          <ProcessOrder />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute admin={true}>
          <ListUsers />
        </ProtectedRoute>
      } />
       <Route path="/admin/users/:id" element={
        <ProtectedRoute admin={true}>
          <UpdateUser />
        </ProtectedRoute>
      } />
       <Route path="/admin/reviews" element={
        <ProtectedRoute admin={true}>
          <ProductReviews />
        </ProtectedRoute>
      } />
    </>
  )
}

export default AdminRoutes
