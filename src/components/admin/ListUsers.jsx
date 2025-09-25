import React, { useEffect } from 'react'
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetAdminUsersQuery } from '../../redux/api/userApi';
import AdminLayout from '../layout/AdminLayout';

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [deleteUser, { error: deleteError, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteUserMutation();
  const navigate = useNavigate();

  // ✅ Define this before using in setUsers()
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const users = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Role', field: 'role', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' }
      ],
      rows: []
    };

    data?.users?.forEach((item) => {
      users.rows.push({
        id: item?._id,
        name: item?.name,
        email: item?.email?.substring(0, 5) + '....',
        role: item?.role,
        actions: (
          <>
            <Link to={`/admin/users/${item?._id}`} className='btn btn-outline-primary'>
              <i className="fa fa-pencil"></i>
            </Link>
            <button className='ms-2 btn btn-outline-danger' onClick={() => handleDeleteUser(item?._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </>
        )
      });
    });

    return users;
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isDeleteSuccess) {
      toast.success("User Deleted Successfully");
      navigate('/admin/users');
    }
  }, [error, deleteError, isDeleteSuccess, navigate]);

  if (isLoading || isDeleteLoading) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <h1 className='my-5'>{data?.users?.length} Users</h1>
      <MDBDataTable
        data={setUsers()}
        className='px-3'
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListUsers;
