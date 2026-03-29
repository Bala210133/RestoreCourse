import { createApi,  } from "@reduxjs/toolkit/query/react";
import type { product } from "../../App/models/product";
import { baseQueryWithErrorHandling } from "../../App/api/baseApi";

export const catalogApi = createApi({
    reducerPath: "catalogApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<product[], void>({
            query: () => ({url: 'products'})
        }),
        fetchProductDetails: builder.query<product, number>({
            query:(productID)=> `products/${productID}`
        })
    })
});

export const {useFetchProductsQuery, useFetchProductDetailsQuery} = catalogApi;