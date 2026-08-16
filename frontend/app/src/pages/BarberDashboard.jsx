import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const BarberDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: '1200px',
        mx: 'auto',
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
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#F9F9F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <DashboardIcon sx={{ fontSize: '48px', color: '#1B263B' }} />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '28px', sm: '36px' },
            lineHeight: { xs: '36px', sm: '44px' },
            fontWeight: 600,
            color: '#1B263B',
            mb: 2,
          }}
        >
          Barber Dashboard
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: '#6B7280',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          This is the admin dashboard. Manage bookings, services, and users from here.
        </Typography>
      </Card>
    </Box>
  );
};

export default BarberDashboard;
