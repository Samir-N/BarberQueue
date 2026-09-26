import { useEffect } from 'react';
import axios from 'axios';
import Booking from '../components/Booking';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/authSlice';
import { toggleBooking, hideBooking } from '../redux/features/bookingSlice';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import WaitingList from '../components/WaitingList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListAltIcon from '@mui/icons-material/ListAlt';

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

  useEffect(() => {
    return () => {
      dispatch(hideBooking());
    };
  }, [dispatch]);

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
      {isVisible ? (
        <Booking />
      ) : (
        <>
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
              {user?.role === "user"
                ? "Book your appointment. Select a service with preferred time."
                : "Manage your schedule and view upcoming appointments."}
            </Typography>
          </Box>

      {/* Conditional Action Button */}
<div className="w-full flex justify-center mb-8">
  {user?.role === 'user' ? (
    <Button
      variant="primary"
      size="lg"
      onClick={() => dispatch(toggleBooking())}
      className="w-full max-w-[400px] gap-2"
    >
      <CalendarTodayIcon className="!text-[20px]" />
      Book an Appointment
    </Button>
  ) : (
    <Button
      variant="secondary"
      size="lg"
      onClick={() => navigate('/barber/dashboard')} // adjust route as needed
      className="w-full max-w-[400px] gap-2"
    >
      <ListAltIcon className="!text-[20px]" />
      Manage Bookings
    </Button>
  )}
</div>

<WaitingList />


        </>
      )}
    </Box>
  );
};

export default Home;