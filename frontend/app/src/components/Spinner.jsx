import { ClipLoader } from 'react-spinners';
import { Box } from '@mui/material';

const Spinner = ({ loading = true, size = 60, color = '#FFC300' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(249, 249, 246, 0.95)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        gap: 2,
      }}
    >
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        cssOverride={{
          borderWidth: '6px',
        }}
      />
    </Box>
  );
};

export default Spinner;
