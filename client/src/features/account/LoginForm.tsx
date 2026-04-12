import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";



export default function LoginForm() {
const [login,{isLoading}] = useLoginMutation();
const[fetchUserInfo] = useLazyUserInfoQuery();
const location = useLocation();
const {register,handleSubmit, formState: {errors}} = useForm<LoginSchema>({
  mode: 'onTouched',
  resolver:zodResolver(loginSchema)
});

const navigate = useNavigate();



const onSubmit = async (data: LoginSchema) => {
  await login(data);
  await fetchUserInfo();
  navigate(location.state?.from || '/catalog');
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
          Sign in
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
            {...register("password",
              
            )}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />

          <Button disabled={isLoading} variant="contained" type="submit">
            Sign in
          </Button>

          
          <Typography align="center">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

