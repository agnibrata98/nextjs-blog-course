'use client';
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { loginMutation } from '@/customHooks/auth.query.hooks';
import { useRouter } from 'next/router';
import { useUserStore } from '@/toolkit/store/store';
import toast from 'react-hot-toast';

const StyledContainer = styled(Grid)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1976d2 30%, #2196f3 90%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const StyledForm = styled(Grid)({
  maxWidth: 400,
  width: '100%',
  background: '#fff',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  background: 'linear-gradient(135deg, #1976d2 30%, #64b5f6)',
  color: '#fff',
  fontWeight: 'bold',
  padding: '10px',
  '&:hover': {
    background: 'linear-gradient(135deg, #1565c0, #42a5f5)',
  },
});

const Login: React.FC = () => {
  // state management
  const [showPassword, setShowPassword] = useState(false);
  // for global state of zustand
  const { token, setToken } = useUserStore()

  // router navigation
  const router = useRouter();

  // react hook forms
  const { register, handleSubmit, formState: { errors } } = useForm();

  // login mutation
  const { mutate, isPending } = loginMutation();


  // on submit function for login
  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    mutate(formData, {
      onSuccess: (data) => {
        // console.log(data, "data");
        setToken("");
        toast.success(data.message);
        router.push("/");
      },
      onError: (error: any) => {
        console.log(error, "error");
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <StyledContainer container>
      <StyledForm item>
        <form>
          <Typography variant="h4" gutterBottom style={{ color: '#1976d2', textAlign: 'center', fontWeight: 'bold' }}>
            Sign In
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            InputLabelProps={{
              style: { color: '#000' },
            }}
            InputProps={{
              style: { color: '#000' },
            }}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-focused': {
                  backgroundColor: '#e0e0e0',
                },
              },
            }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message as string : ''}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            InputLabelProps={{
              style: { color: '#000' },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{ color: '#000' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
              style: { color: '#000' },
            }}
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message as string : ''}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
          </StyledButton>

          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Typography variant="body2" style={{ color: '#000' }}>
              Don’t have an account?{' '}
              <Link href="/auth/register" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </form>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
