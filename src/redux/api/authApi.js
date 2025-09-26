import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated } from '../features/userSlice';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shopit-ecommerce-mern-backend-new.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: 'POST',
          body
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token); // store token after register
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
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token); // store token after login
          await dispatch(userApi.endpoints.getMe.initiate(null));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.log(error);
        }
      }
    }),
    logout: builder.query({
      query: () => "/logout",
      async onQueryStarted(args, { dispatch }) {
        localStorage.removeItem("token"); // remove token on logout
        dispatch(setIsAuthenticated(false));
      }
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;
