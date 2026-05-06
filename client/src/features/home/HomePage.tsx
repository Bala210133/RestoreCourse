import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box maxWidth='xl' mx='auto' px={4} position='relative'>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' position='relative'>

        <img src="/images/hero1.jpg" alt="ski resort image" style={{position: "absolute", inset:0, width:'100%', height:'100%', objectFit:'cover', borderRadius:'16px', zIndex:0}} />

        <Box display='flex' flexDirection='column' p={8} alignItems='center' position='relative' borderRadius={4}>
          <Typography variant="h1" color="white" fontWeight='bold' textAlign='center' sx={{my:3}}>
            Welcome To Restore!
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to='/catalog'
            sx={{
              mt: 8,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'white',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              background: 'rgba(37, 99, 235, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(147, 197, 253, 0.6)',
              borderRadius: '50px',
              boxShadow: '0 4px 24px rgba(37, 99, 235, 0.45)',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: 'rgba(29, 78, 216, 0.95)',
                borderColor: 'rgba(147, 197, 253, 0.9)',
                boxShadow: '0 6px 32px rgba(37, 99, 235, 0.65)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
          >
            Go To Shop
          </Button>
        </Box>
      </Box>
    </Box>
  );
}