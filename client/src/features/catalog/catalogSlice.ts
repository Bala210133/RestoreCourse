import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../../app/models/productParams";

const initialState: ProductParams = {
    pageNumber:1,
    pageSize:8,
    types:[],
    brands:[],
    searchTerm:'',
    orderby:'name'
}

export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setPageNumber(state, action)  {
            state.pageNumber = action.payload;
        },
        setPageSize (state, action)  {
            state.pageSize = action.payload;
        },
        setOrderby(state, action) {
            state.orderby = action.payload;
            state.pageNumber = 1;

        },

         setTypes(state, action) {
            state.Types = action.payload;
            state.pageNumber = 1;

        },

         setBrands(state, action) {
            state.Brands = action.payload;
            state.pageNumber = 1;

        },

         setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            state.pageNumber = 1;

        },

            resetParams() {

                return initialState;
            }
    }

});

export const {setBrands, setOrderby,setPageNumber,setPageSize, setTypes, setSearchTerm, resetParams} = catalogSlice.actions;