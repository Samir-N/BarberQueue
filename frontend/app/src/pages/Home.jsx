import { useEffect } from 'react';
import axios from 'axios';
import Booking from '../components/Booking';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/authSlice';
import { toggleBooking } from '../redux/features/bookingSlice';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import WaitingList from '../components/WaitingList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { isVisible } = useSelector(state => state.booking);

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/barber/login');
      return;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/v1/user/getUserData',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        dispatch(setUser({ 
          user: response.data.data 
        }));
      } else {
        localStorage.removeItem('token');
        navigate('/barber/login');
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/barber/login');
      }
    }
  };

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

  if (isVisible) {
    return <Booking />;
  }

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      py: { xs: 3, sm: 4, md: 6 },
      px: { xs: 2, sm: 3, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      mx: 'auto',
    }}>
      {/* Welcome Header */}
      <Box sx={{ 
        mb: { xs: 4, md: 5 },
        textAlign: 'center',
        width: '100%',
      }}>

        <Typography
          sx={{
            fontSize: { xs: '28px', sm: '36px', md: '48px' },
            lineHeight: { xs: '36px', sm: '44px', md: '56px' },
            fontWeight: 700,
            color: '#1B263B',
            mb: 1,
          }}
        >
          Welcome{user?.name ? `, ${user.name}` : ''}!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: { xs: '24px', md: '28px' },
            fontWeight: 400,
            color: '#6B7280',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Book your appointment with ease. Select a service and choose your preferred time.
        </Typography>
      </Box>

      {/* WAITING LIST */}
      <Box sx={{ height:'auto',width: '100%', mb: { xs: 3, md: 4 } }}>
        <WaitingList />
      </Box>

      {/* Book Appointment Button - Sticky on Mobile */}
      <Button
        onClick={() => dispatch(toggleBooking())}
        fullWidth
        sx={{
          py: { xs: 2, md: 1.75 },
          px: 3,
          fontSize: { xs: '18px', md: '16px' },
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: '8px',
          backgroundColor: '#FFC300',
          color: '#222222',
          boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)',
          minHeight: { xs: '56px', md: '48px' },
          maxWidth: { xs: '100%', md: '400px' },
          position: { xs: 'sticky', md: 'static' },
          bottom: { xs: '80px', md: 'auto' },
          zIndex: 100,
          '&:hover': {
            backgroundColor: '#E6B000',
            boxShadow: '0 6px 16px rgba(255, 195, 0, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: '24px', mr: 1.5 }} />
        Book an Appointment
      </Button>
    </Box>
  );
};

export default Home;