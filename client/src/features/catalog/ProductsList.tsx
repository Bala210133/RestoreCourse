import { Box } from "@mui/material"
import type { product } from "../../App/models/product"
import ProductCard from "./ProductCard"

type Props ={
    products: product[]
}

export default function ProductsList({products}: Props) {
  return (
    <Box sx={{display:'flex', flexWrap:'wrap',gap:3,justifyContent:'center'}}> 
      {products.map((product)=>(
        <ProductCard key={product.id} product={product}/>
        
      ))}
    </Box>
  )
}