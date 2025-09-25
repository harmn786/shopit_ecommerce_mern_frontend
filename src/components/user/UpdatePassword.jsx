import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';

const UpdatePassword = () => {
    const navigate = useNavigate()
        // const {isAuthenticated} = useSelector((state)=>state.auth) 
          const [oldPassword,setOldPassword] = useState('');
          const [newPassword,setNewPassword] = useState('');
          const [confirmPassword,setConfirmPassword] = useState('');
          const [UpdatePassword,{isLoading,error,isSuccess}] = useUpdatePasswordMutation();
          useEffect(()=>{
            if(error){
              toast.error(error?.data?.message)
            }
            if(isSuccess){
              toast.success("Profile Updated Successfully")
              navigate('/me/profile')
            }
          },[error,isSuccess]);
        const handleSubmit  = (e)=>{
            e.preventDefault();
            const userData = {
            oldPassword,newPassword,confirmPassword
        }
         UpdatePassword(userData);
        }
  return (
    <UserLayout>
     <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update Password</h2>
          <div className="mb-3">
            <label htmlFor="old_password_field" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
              Confirn New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn update-btn w-100">
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  )
}

export default UpdatePassword
