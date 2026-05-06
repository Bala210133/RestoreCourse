import {  Grid } from "@mui/material"
import type { Product } from "../../App/models/product"
import ProductCard from "./ProductCard"

type Props ={
    products: Product[]
}

export default function ProductsList({products}: Props) {
  return (
    <Grid container spacing={3}>
   
      {products.map((product)=>(
        <Grid size={3} display='flex' key={product.id}><ProductCard  product={product}/></Grid>
        
        
      ))}
    </Grid>
  )
}