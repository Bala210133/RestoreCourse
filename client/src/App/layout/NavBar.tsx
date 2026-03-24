import {  DarkMode,LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar,Badge,Box,IconButton,List,ListItem,Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midlinks = [
    {title:'catalog',path:'/catalog'},
    {title:'about',path:'/about'},
    {title:'contact',path:'/contact'},
]

const rightlinks = [
    {title:'login',path:'/login'},
    {title:'register',path:'/register'},
]

const navstyles = {
                color:'inherit',
                typography:'h6',
                textDecoration:'none',
                '&:hover':{
                    color: 'grey.500'},
                    '&.active':{color: '#baecf9'}
                }

type props ={
    toggledarkmode: () => void;
    darkMode: boolean;
}

export default function NavBar({toggledarkmode,darkMode}:props) {
  return (
   <AppBar position="fixed">
    
    <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Box display='flex' alignItems='center' >
             <Typography component={NavLink} sx={navstyles} to="/" variant="h6">Re-Store</Typography>
        <IconButton onClick={toggledarkmode}>
            {darkMode ? <DarkMode/> : <LightMode sx={{color:'yellow'}}/>}
            
        </IconButton>
        </Box>
       
        <List sx={{display:'flex'}}>
              {midlinks.map(({title,path})=>(
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navstyles}>
                {title.toUpperCase()}

            </ListItem>
        ))}
        </List>
        <Box display='flex' alignItems='center'>
             <IconButton size="large" sx={{color:'inherit'}}>
            <Badge badgeContent={4} color="secondary"> 
                <ShoppingCart />
            </Badge>
        </IconButton>

        <List sx={{display:'flex'}}>
              {rightlinks.map(({title,path})=>(
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navstyles}>
                {title.toUpperCase()}

            </ListItem>
        ))}
        </List>

        </Box>

       
        
        
      
    </Toolbar>



   </AppBar>
   
  )
}