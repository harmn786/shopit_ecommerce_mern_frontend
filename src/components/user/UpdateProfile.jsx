import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';

const UpdateProfile = () => {
   const navigate = useNavigate()
   const {user} = useSelector((state)=>state.auth);
    // const {isAuthenticated} = useSelector((state)=>state.auth) 
      const [email,setEmail] = useState('');
      const [name,setName] = useState('');
      const [UpdateProfile,{isLoading,error,isSuccess}] = useUpdateProfileMutation();
      useEffect(()=>{
        if(user){
          setName(user.name);
          setEmail(user.email);
        }
        if(error){
          toast.error(error?.data?.message)
        }
        if(isSuccess){
          toast.success("Profile Updated Successfully")
          navigate('/me/profile')
        }
      },[user,error,isSuccess]);
    const handleSubmit  = (e)=>{
        e.preventDefault();
        const userData = {
        name,email
    }
     UpdateProfile(userData);
    }
  return (
    <UserLayout>
     <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
         onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label for="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="email_field" className="form-label"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}>{isLoading?"Updating":"Update"}</button>
        </form>
      </div>
    </div>
    </UserLayout>
  )
}

export default UpdateProfile
