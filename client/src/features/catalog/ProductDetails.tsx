import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { product } from "../../App/models/product";
import { Button, Divider, Grid, Table, TableBody, TableContainer, TableRow, TextField, Typography,TableCell } from "@mui/material";





export default function ProductDetails() {
  const {id} = useParams<{id:string }>();
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    fetch(`https://localhost:7197/API/products/${id}`)
    .then(response => response.json())
    .then(data => setProduct(data))
    .catch(error => console.log(error))
  }, [id])

  if (!product) return <div>Loading...</div>

  const productDetails = [
    {label:'Name', value: product.name},
    {label:'Description', value: product.description},
    {label:'Type', value: product.type},
    {label:'Brand', value: product.brand},
    {label:'Quantity in Stock', value: product.quantityInStock}
  ]

  return (
    <Grid container spacing={6} maxWidth='lg' sx={{mx:'auto'}}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color='secondary'>${(product?.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{'& td': {fontSize: '1rem'}}}>
            <TableBody>
              {productDetails.map((detail,index) =>(
                <TableRow key={index}> 
                <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                <TableCell>{detail.value}</TableCell>
                </TableRow> ))}
              
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}></Grid>
        <Grid size={6}>
          <TextField 
          variant="outlined"
          type="number"
          label="Quantity in basket"
          fullWidth
          defaultValue={1}
          ></TextField>
          
        </Grid>
        <Grid size={6}>
          <Button 
          sx={{height: '55px'}}
            color="primary"
            size="Large"
            variant="contained"
            fullWidth
          > 
          Add to Basket 
          
          </Button>
        </Grid>
      </Grid>

    </Grid>

  )
}

