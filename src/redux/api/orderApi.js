import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const orderApi = createApi({
    // keepUnusedDataFor:60,
    reducerPath:'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://shopit-ecommerce-mern-backend-new.vercel.app/api/v1" ,
         prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    }),
    tagTypes:["Order","AdminOrders"],
    endpoints:(builder)=>({
       
        createNewOrder:builder.mutation({
            query(body){
                return{
                    url:"/orders/new",
                    method:"POST",
                    body,
                }
            },
        }),
        stripeCheckoutSession:builder.mutation({
            query(body){
                return{
                    url:"/payment/checkout_session",
                    method:"POST",
                    body,
                }
            },
        }),
         myOrders:builder.query({
            query:()=>"/me/orders",
        }),
        orderDetails:builder.query({
            query:(id)=>`/orders/${id}`,
            providesTags: ["Order"],
        }),
         getDashboardSales:builder.query({
            query:({startDate,endDate})=>`/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        }),
        getAdminOrders:builder.query({
            query:()=>"/admin/orders",
            providesTags: ["AdminOrders"],
        }),
         updateOrder:builder.mutation({
            query({id,body}){
                return{
                    url:`admin/orders/${id}`,
                    method:"PUT",
                    body,
                }
            },
            invalidatesTags: ["Order"], 
        }),
        deleteOrder:builder.mutation({
            query(id){
                return{
                    url:`admin/orders/${id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: ["AdminOrders"],  
        }),
    })
})
export const {
    useCreateNewOrderMutation,
    useStripeCheckoutSessionMutation,
    useMyOrdersQuery,
    useOrderDetailsQuery,
    useLazyGetDashboardSalesQuery,
    useGetAdminOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;