import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    navigate('/barber/login');
  };

  const isActive = (path) => location.pathname === path;

  // Mobile Bottom Navigation
  if (isMobile && user) {
    return (
      <>
        {/* Top Bar - Mobile */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            zIndex: 1100,
            boxShadow: '0 1px 3px rgba(27, 38, 59, 0.05)',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1B263B',
              letterSpacing: '-0.5px',
            }}
          >
            Barber App
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{
              minWidth: 'auto',
              px: 1.5,
              py: 0.75,
              color: '#1B263B',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#F9F9F6',
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: '20px', mr: 0.5 }} />
            Logout
          </Button>
        </Box>

        {/* Bottom Navigation - Mobile */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '64px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 1100,
            boxShadow: '0 -2px 8px rgba(27, 38, 59, 0.08)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <Button
            onClick={() => navigate('/')}
            sx={{
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 'auto',
              px: 2,
              py: 1,
              color: isActive('/') ? '#FFC300' : '#6B7280',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <HomeIcon sx={{ fontSize: '24px' }} />
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: isActive('/') ? 600 : 400,
                color: 'inherit',
              }}
            >
              Home
            </Typography>
            {isActive('/') && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#FFC300',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )}
          </Button>

          <Button
            onClick={() => navigate(user?.role === 'admin' ? '/barber/dashboard' : '/user/dashboard')}
            sx={{
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 'auto',
              px: 2,
              py: 1,
              color: isActive('/barber/dashboard') || isActive('/user/dashboard') ? '#FFC300' : '#6B7280',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <DashboardIcon sx={{ fontSize: '24px' }} />
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: (isActive('/barber/dashboard') || isActive('/user/dashboard')) ? 600 : 400,
                color: 'inherit',
              }}
            >
              Dashboard
            </Typography>
            {(isActive('/barber/dashboard') || isActive('/user/dashboard')) && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  backgroundColor: '#FFC300',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )}
          </Button>

          <Button
            onClick={() => navigate('/')}
            sx={{
              flexDirection: 'column',
              gap: 0.5,
              minWidth: 'auto',
              px: 2,
              py: 1,
              color: '#6B7280',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <PersonIcon sx={{ fontSize: '24px' }} />
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: 400,
                color: 'inherit',
              }}
            >
              Profile
            </Typography>
          </Button>
        </Box>
      </>
    );
  }

  // Desktop Navigation
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        zIndex: 1100,
        boxShadow: '0 1px 3px rgba(27, 38, 59, 0.05)',
      }}
    >
      {/* Logo */}
      <Typography
        onClick={() => navigate('/')}
        sx={{
          fontSize: { xs: '18px', md: '20px' },
          fontWeight: 700,
          color: '#1B263B',
          letterSpacing: '-0.5px',
          cursor: 'pointer',
          '&:hover': {
            color: '#415A77',
          },
        }}
      >
        Barber App
      </Typography>

      {/* Center Navigation */}
      {user && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? '#FFC300' : '#1B263B',
              fontSize: '16px',
              fontWeight: isActive('/') ? 600 : 400,
              textTransform: 'none',
              px: 2,
              py: 1,
              position: 'relative',
              '&:hover': {
                backgroundColor: '#F9F9F6',
              },
              '&::after': isActive('/') ? {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '3px',
                backgroundColor: '#FFC300',
                borderRadius: '2px 2px 0 0',
              } : {},
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(user?.role === 'admin' ? '/barber/dashboard' : '/user/dashboard')}
            sx={{
              color: (isActive('/barber/dashboard') || isActive('/user/dashboard')) ? '#FFC300' : '#1B263B',
              fontSize: '16px',
              fontWeight: (isActive('/barber/dashboard') || isActive('/user/dashboard')) ? 600 : 400,
              textTransform: 'none',
              px: 2,
              py: 1,
              position: 'relative',
              '&:hover': {
                backgroundColor: '#F9F9F6',
              },
              '&::after': (isActive('/barber/dashboard') || isActive('/user/dashboard')) ? {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '3px',
                backgroundColor: '#FFC300',
                borderRadius: '2px 2px 0 0',
              } : {},
            }}
          >
            Dashboard
          </Button>
        </Box>
      )}

      {/* Right Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {user ? (
          <Button
            onClick={handleLogout}
            sx={{
              backgroundColor: 'transparent',
              color: '#1B263B',
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              px: 2,
              py: 1,
              border: '1px solid #415A77',
              borderRadius: '8px',
              minHeight: '44px',
              '&:hover': {
                backgroundColor: '#F9F9F6',
                borderColor: '#1B263B',
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: '20px', mr: 1 }} />
            Log Out
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate('/barber/register')}
              sx={{
                backgroundColor: 'transparent',
                color: '#1B263B',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                px: 2,
                py: 1,
                border: '1px solid #415A77',
                borderRadius: '8px',
                minHeight: '44px',
                '&:hover': {
                  backgroundColor: '#F9F9F6',
                  borderColor: '#1B263B',
                },
              }}
            >
              <AppRegistrationIcon sx={{ fontSize: '20px', mr: 1 }} />
              Register
            </Button>
            <Button
              onClick={() => navigate('/barber/login')}
              sx={{
                backgroundColor: '#FFC300',
                color: '#222222',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1,
                borderRadius: '8px',
                minHeight: '44px',
                boxShadow: '0 2px 8px rgba(255, 195, 0, 0.3)',
                '&:hover': {
                  backgroundColor: '#E6B000',
                  boxShadow: '0 4px 12px rgba(255, 195, 0, 0.4)',
                },
              }}
            >
              <LoginIcon sx={{ fontSize: '20px', mr: 1 }} />
              Log In
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
