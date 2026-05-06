import {  Grid } from "@mui/material"
import type { product } from "../../App/models/product"
import ProductCard from "./ProductCard"

type Props ={
    products: product[]
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