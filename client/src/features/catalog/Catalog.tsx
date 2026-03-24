
import { useEffect, useState } from "react";
import type { product } from "../../App/models/product";
import ProductsList from "./ProductsList";





export default function Catalog() {

  const [products,setProducts] = useState<product[]>([]);

   useEffect(()=>{
    fetch('https://localhost:7197/API/products')
    .then(response=> response.json())
    .then(data => setProducts(data))
  } , [])
  
  return (
    <div>
    <ProductsList products={products}></ProductsList>
    
    </div>
  )
}