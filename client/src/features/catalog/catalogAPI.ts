import { createApi,  } from "@reduxjs/toolkit/query/react";
import type { product } from "../../App/models/product";
import { baseQueryWithErrorHandling } from "../../App/api/baseApi";
import { ProductParams } from "../../App/models/productParams";
import { filterEmptyValue } from "../../lib/util";
import type { Pagination } from "../../App/models/pagination";

export const catalogApi = createApi({
    reducerPath: "catalogApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<{items:product[], pagination:Pagination}, ProductParams>({
            query: (productParams) => {
                
                return {
                url: 'products',
                params: filterEmptyValue(productParams)
                    }
            },
            transformResponse :(items:product[], meta) => {
                const paginationHeader = meta?.response?.headers.get('Pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader)  : null;
                return {items, pagination }
            }
        }),
        fetchProductDetails: builder.query<product, number>({
            query:(productID)=> `products/${productID}`
        }),
        fetchFilters: builder.query<{brands: string[], types: string[]}, void>({
            query: () => 'products/filters'
        }   )
    })
});

export const {useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery} = catalogApi;