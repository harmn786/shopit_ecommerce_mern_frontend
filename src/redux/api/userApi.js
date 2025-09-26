import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';
export const userApi = createApi({
    // keepUnusedDataFor:60,
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://shopit-ecommerce-mern-backend-new.vercel.app/api/v1" }),
    tagTypes: ["User","AdminUsers"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: (id) => `/me`,
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(setLoading(false));
                }
            },
            providesTags:["User"]
        }),
        updateProfile:builder.mutation({
            query(body){
                return{
                    url:"/me/update",
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:["User"]

        }),
        uploadAvatar:builder.mutation({
            query(body){
                return{
                    url:"/me/upload_avatar",
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:["User"]

        }),
        updatePassword:builder.mutation({
            query(body){
                return{
                    url:"/password/update",
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:["User"]

        }),
        forgotPassword:builder.mutation({
            query(body){
                return{
                    url:"/password/forgot",
                    method:'POST',
                    body
                }
            },
            invalidatesTags:["User"]

        }),
        resetPassword:builder.mutation({
            query({token,body}){
                return{
                    url:`/password/reset/${token}`,
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:["User"]

        }),
        getAdminUsers:builder.query({
            query:()=>"/admin/users",
            providesTags: ["AdminUsers"],
        }),
        getUserDetails:builder.query({
            query:(id)=>`/admin/users/${id}`,
            providesTags: ["AdminUsers"],
        }),
        updateUser:builder.mutation({
            query({id,body}){
                return{
                    url:`/admin/users/update/${id}`,
                    method:'PUT',
                    body
                }
            },
            invalidatesTags:["User","AdminUsers"]

        }),
         deleteUser:builder.mutation({
            query(id){
                return{
                    url:`/admin/users/delete/${id}`,
                    method:'DELETE',
                }
            },
            invalidatesTags:["User","AdminUsers"]

        }),

    })
})
export const { useGetMeQuery,useUpdateProfileMutation,useUploadAvatarMutation,useUpdatePasswordMutation,useForgotPasswordMutation,useResetPasswordMutation,useGetAdminUsersQuery,useUpdateUserMutation,useGetUserDetailsQuery,useDeleteUserMutation } = userApi;