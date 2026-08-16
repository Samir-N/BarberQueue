import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Card,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading, showAlert } from '../redux/features/alertSlice.js';
import { setUser } from '../redux/features/authSlice.js';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';

const BarberRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/v1/user/register',
        formData
      );  
      dispatch(hideLoading());
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        dispatch(setUser({ 
          user: response.data.user, 
          token: response.data.token 
        }));
        dispatch(showAlert({message: "Registration Successful!", type: "success", duration: 2000}));
        setTimeout(() => {
          navigate('/');  
        }, 1500);
      } else {
        dispatch(showAlert({message: response.data.message || "Registration failed!", type: "error"}));
      }
    } catch (error) {
      dispatch(hideLoading());
      dispatch(showAlert({message: "Something went wrong!", type: "error"}));
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '450px' },
          p: { xs: 3, sm: 4 },
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 12px rgba(27, 38, 59, 0.08)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#FFC300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <PersonAddIcon sx={{ fontSize: '32px', color: '#222222' }} />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '24px', sm: '28px' },
              lineHeight: { xs: '32px', sm: '36px' },
              fontWeight: 600,
              color: '#1B263B',
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              color: '#6B7280',
            }}
          >
            Sign up to get started
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <PersonIcon sx={{ color: '#6B7280', mr: 1, fontSize: '20px' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#415A77',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFC300',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B263B',
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              inputProps={{ minLength: 10 }}
              InputProps={{
                startAdornment: (
                  <PhoneIcon sx={{ color: '#6B7280', mr: 1, fontSize: '20px' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#415A77',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFC300',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B263B',
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <LockIcon sx={{ color: '#6B7280', mr: 1, fontSize: '20px' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#415A77',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFC300',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B263B',
                },
              }}
            />

            <FormControl 
              fullWidth 
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#415A77',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFC300',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1B263B',
                },
              }}
            >
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                backgroundColor: '#FFC300',
                color: '#222222',
                minHeight: '48px',
                boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)',
                '&:hover': {
                  backgroundColor: '#E6B000',
                  boxShadow: '0 6px 16px rgba(255, 195, 0, 0.4)',
                },
              }}
            >
              Register
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#6B7280',
            }}
          >
            Already have an account?{' '}
            <Typography
              component="span"
              onClick={() => navigate('/barber/login')}
              sx={{
                color: '#1B263B',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': {
                  color: '#FFC300',
                },
              }}
            >
              Log In
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default BarberRegister;
