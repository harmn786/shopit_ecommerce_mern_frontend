import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams()
        const [password,setPassword] = useState('');
        const [confirmPassword,setConfirmPassword] = useState('');
          const {isAuthenticated} = useSelector((state)=>state.auth) 
         const [resetPassword,{isLoading,error,isSuccess}] = useResetPasswordMutation();
         useEffect(()=>{
      if(isLoading){
        return <Loader/>
      }
      if(isAuthenticated){
        navigate("/login")
      }
        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
        toast.success("Password Updated Successfully")
      }
    },[error,isAuthenticated,isSuccess]);
const handleSubmit  = (e)=>{
        e.preventDefault();
        const data = {
        password,confirmPassword
    }
    resetPassword({token:params.token,body:data});
    }
  return (
     <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password_field" className="form-label"
              >Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2">
            {isLoading?"Updating":"Update Password"}
          </button>
        </form>
      </div>
    </div>

  )
}

export default ResetPassword
