

import ProductsList from "./ProductsList";
import { useFetchProductsQuery } from "./catalogAPI";





export default function Catalog() {
  const{data,isLoading} = useFetchProductsQuery();

  if(isLoading || !data) return <h3>Loading...</h3>

  
  
  return (
    <div>
    <ProductsList products={data}></ProductsList>
    
    </div>
  )
}