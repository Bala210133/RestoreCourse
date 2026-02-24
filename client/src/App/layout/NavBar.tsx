import { DarkMode,LightMode } from "@mui/icons-material";
import { AppBar,IconButton,Toolbar, Typography } from "@mui/material";

type props ={
    toggledarkmode: () => void;
    darkMode: boolean;
}

export default function NavBar({toggledarkmode,darkMode}:props) {
  return (
   <AppBar position="fixed">
    
    <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <IconButton onClick={toggledarkmode}>
            {darkMode ? <DarkMode/> : <LightMode sx={{color:'yellow'}}/>}
            
        </IconButton>
    </Toolbar>



   </AppBar>
   
  )
}