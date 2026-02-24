
import type { product } from "../../App/models/product";
import ProductsList from "./ProductsList";


type props = {
  products: product[];
 
}


export default function Catalog({products,}:props) {
  return (
    <div>
    <ProductsList products={products}></ProductsList>
    
    </div>
  )
}