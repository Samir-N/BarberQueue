import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PageNotFound = () => {
  const navigate = useNavigate();

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
          p: { xs: 4, sm: 6 },
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 12px rgba(27, 38, 59, 0.08)',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#F9F9F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: '64px', color: '#7C2F2F' }} />
        </Box>
        
        <Typography
          sx={{
            fontSize: { xs: '48px', sm: '64px' },
            lineHeight: 1,
            fontWeight: 700,
            color: '#1B263B',
            mb: 2,
          }}
        >
          404
        </Typography>
        
        <Typography
          sx={{
            fontSize: { xs: '20px', sm: '24px' },
            lineHeight: { xs: '28px', sm: '32px' },
            fontWeight: 600,
            color: '#1B263B',
            mb: 1,
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: '#6B7280',
            mb: 4,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Button
          onClick={() => navigate('/')}
          variant="contained"
          sx={{
            py: 1.5,
            px: 4,
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
          <HomeIcon sx={{ mr: 1, fontSize: '20px' }} />
          Go to Home
        </Button>
      </Card>
    </Box>
  );
};

export default PageNotFound;
