import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema,  type RegisterSchema } from "../../lib/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi"
import { useForm } from "react-hook-form";
import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const[registerUser] = useRegisterMutation();
  const{register, handleSubmit,setError, formState:{errors,isValid,isLoading}} = useForm<RegisterSchema>({

    mode: 'onTouched',
    resolver:zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterSchema) => {
    try{
      await registerUser(data).unwrap();
    } catch (error) {
      const apiErrors = error as {message: string };
      
      if (apiErrors.message && typeof apiErrors.message === 'string') {
        const errorArray = apiErrors.message.split(',');
       
        errorArray.forEach(e => {
          if(e.includes('Password')) {
            setError('password', {message: e})
          } else if(e.includes('Email')) {
            setError('email', {message: e})
          }
        })
      }
    }
  }

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={4}
          >
            <LockOutlined
              sx={{ mt: 3, color: "secondary.main", fontSize: 40 }}
            />
    
            <Typography variant="h5" sx={{ mt: 1 }}>
              Register
            </Typography>
    
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              width="100%"
              display="flex"
              flexDirection="column"
              gap={3}
              my={3}
            >
              <TextField
                fullWidth
                label="Email"
                autoFocus
                {...register("email",
                  
                )}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
    
              <TextField
                fullWidth
                label="Password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
              />
    
              <Button disabled={isLoading || !isValid} variant="contained" type="submit">
                Register
              </Button>
    
              
              <Typography align="center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
  )
}