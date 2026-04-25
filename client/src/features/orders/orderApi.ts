import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../App/api/baseApi";
import type { Order, CreateOrder } from "../../App/models/order";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        fetchOrders: builder.query<Order[], void>({
            query: () => 'orders',
            providesTags: ['Orders']
        }),
        fetchOrderDetailed: builder.query<Order, number>({
            query: (id) => ({
                url: `orders/${id}`
            })
        }),
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: `orders`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const { useFetchOrdersQuery, useFetchOrderDetailedQuery, useCreateOrderMutation } = orderApi;