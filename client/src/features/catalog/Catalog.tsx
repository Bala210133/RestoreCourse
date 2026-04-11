

import { Grid, Typography } from "@mui/material";
import ProductsList from "./ProductsList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogAPI";
import Filters from "./Filters";
import { useAppSelector, useAppDispatch } from "../../App/store/store";
import AppPagination from "../../App/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";





export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog);
  const{data,isLoading} = useFetchProductsQuery(productParams);
  const {data:filtersData, isLoading: isFiltersLoading} = useFetchFiltersQuery();
  const dispatch = useAppDispatch();
  
  if(isLoading || !data || isFiltersLoading || !filtersData) return <h3>Loading...</h3>

  
  
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters filtersData={filtersData}></Filters>
      </Grid>
      <Grid size={9}>
        {data.items && data.items.length > 0 ? (

        
        <>
        <ProductsList products={data.items}></ProductsList>

        <AppPagination
         metadata={data.pagination}
          onPageChange={(page:number)=> {
            dispatch(setPageNumber(page))
            window.scrollTo({top:0, behavior:'smooth'}) ;

          }}
         />
        
        </>
        ):(
          <Typography variant="h5"> There are no results for this filter</Typography>
        )}
         
      </Grid>
   
    
    </Grid>
  )
}