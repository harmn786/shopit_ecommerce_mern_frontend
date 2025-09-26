import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser } from '../features/userSlice';
import { userApi } from './userApi';
export const authApi = createApi({
    // keepUnusedDataFor:60,
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://shopit-ecommerce-mern-backend-new.vercel.app/api/v1" }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: "/register",
                    method: 'POST',
                    body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: 'POST',
                    body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    console.log(error);
                }
            }


        }),
        logout:builder.query({
            query:()=>"/logout",
        })

    })
})
export const { useLoginMutation, useRegisterMutation ,useLazyLogoutQuery} = authApi;