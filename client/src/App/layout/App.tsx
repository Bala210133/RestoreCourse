import { useEffect, useState } from "react"
import type { product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {  Box, Container, createTheme, CssBaseline, ThemeProvider,  } from "@mui/material";
import NavBar from "./NavBar";
import { dark } from "@mui/material/styles/createPalette";




function App() {
  const [products,setProducts] = useState<product[]>([]);
  const [darkMode,setDarkMode] = useState(false);
  const palletetype = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:palletetype,
      background:{
        default: (palletetype === 'light') ? '#eaeaea' : '#121212'
        
    }
  }})

  const toggledarkmode = () => {
    setDarkMode(!darkMode)
  }


  useEffect(()=>{
    fetch('https://localhost:7197/API/products')
    .then(response=> response.json())
    .then(data => setProducts(data))
  } , [])



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
     <NavBar toggledarkmode={toggledarkmode} darkMode={darkMode}/>
     <Box
     sx={{
      minHeight: '100vh',
      background: darkMode
      ? 'radial-gradient(circle, #1e3aBa, #111B27)'
      : 'radial-gradient(circle, #baecf9, #f0f9ff)',
      py:6
      }}>

      <Container maxWidth="xl" sx={{mt:8}}>
      <Catalog products={products} />
     </Container>
     </Box>
     
     </ThemeProvider>
 

  )
}

export default App
