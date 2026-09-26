import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WaitingList from '../components/WaitingList';
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
        <WaitingList />
      </Card>
    </Box>
  );
};

export default BarberDashboard;
