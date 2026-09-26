import { createTheme } from '@mui/material/styles';

// Royal Barber Theme - Deep Gold & Charcoal Black
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B8860B', // Deep Gold
      dark: '#9A7209', // Rich Gold Hover
      light: '#C9A647',
      contrastText: '#FAFAF8', // Warm White
    },
    secondary: {
      main: '#1C1C1E', // Charcoal Black
      dark: '#0D0D0E',
      light: '#2C2C2E', // Soft Black
      contrastText: '#FAFAF8', // Warm White
    },
    success: {
      main: '#34C759', // Success Green
      light: 'rgba(52, 199, 89, 0.15)',
      contrastText: '#FAFAF8',
    },
    error: {
      main: '#FF3B30', // Alert Red
      light: 'rgba(255, 59, 48, 0.15)',
      contrastText: '#FAFAF8',
    },
    warning: {
      main: '#FFB300',
      light: 'rgba(255, 179, 0, 0.15)',
      contrastText: '#1C1C1E',
    },
    info: {
      main: '#007AFF', // Info Blue
      light: 'rgba(0, 122, 255, 0.15)',
      contrastText: '#FAFAF8',
    },
    background: {
      default: '#FAFAF8', // Warm White
      paper: '#FFFFFF',
      elevated: '#2C2C2E', // Soft Black for dark cards
    },
    text: {
      primary: '#1C1C1E', // Charcoal Black
      secondary: '#8E8E93', // Medium Gray
      disabled: '#C7C7CC',
    },
    divider: '#D1D1D6', // Border Gray
    action: {
      active: '#B8860B',
      hover: 'rgba(184, 134, 11, 0.08)',
      selected: 'rgba(184, 134, 11, 0.16)',
      disabled: '#C7C7CC',
      disabledBackground: '#F5F5F3',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.25,
      color: '#1C1C1E',
      '@media (min-width:960px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.33,
      color: '#1C1C1E',
      '@media (min-width:960px)': {
        fontSize: '2.25rem',
      },
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1C1C1E',
      '@media (min-width:960px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.33,
      color: '#1C1C1E',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#1C1C1E',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
      color: '#1C1C1E',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#8E8E93',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      color: '#8E8E93',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(28, 28, 30, 0.05)',
    '0 1px 3px rgba(28, 28, 30, 0.08)',
    '0 2px 4px rgba(28, 28, 30, 0.08)',
    '0 4px 8px rgba(28, 28, 30, 0.08)',
    '0 4px 12px rgba(28, 28, 30, 0.1)',
    '0 6px 16px rgba(28, 28, 30, 0.1)',
    '0 8px 20px rgba(28, 28, 30, 0.12)',
    '0 8px 24px rgba(28, 28, 30, 0.12)',
    '0 12px 32px rgba(28, 28, 30, 0.14)',
    '0 16px 40px rgba(28, 28, 30, 0.16)',
    '0 20px 48px rgba(28, 28, 30, 0.18)',
    '0 24px 56px rgba(28, 28, 30, 0.2)',
    '0 28px 64px rgba(28, 28, 30, 0.22)',
    '0 32px 72px rgba(28, 28, 30, 0.24)',
    '0 36px 80px rgba(28, 28, 30, 0.26)',
    '0 40px 88px rgba(28, 28, 30, 0.28)',
    '0 44px 96px rgba(28, 28, 30, 0.3)',
    '0 48px 104px rgba(28, 28, 30, 0.32)',
    '0 52px 112px rgba(28, 28, 30, 0.34)',
    '0 56px 120px rgba(28, 28, 30, 0.36)',
    '0 60px 128px rgba(28, 28, 30, 0.38)',
    '0 64px 136px rgba(28, 28, 30, 0.4)',
    '0 68px 144px rgba(28, 28, 30, 0.42)',
    '0 72px 152px rgba(28, 28, 30, 0.44)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          minHeight: '44px',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)',
          },
        },
        containedPrimary: {
          backgroundColor: '#B8860B',
          color: '#FAFAF8',
          '&:hover': {
            backgroundColor: '#9A7209',
          },
        },
        containedSecondary: {
          backgroundColor: '#1C1C1E',
          color: '#FAFAF8',
          '&:hover': {
            backgroundColor: '#2C2C2E',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
        outlinedPrimary: {
          borderColor: '#B8860B',
          color: '#B8860B',
          '&:hover': {
            backgroundColor: 'rgba(184, 134, 11, 0.08)',
            borderColor: '#9A7209',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: '#F5F5F3',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(28, 28, 30, 0.08)',
          border: '1px solid #D1D1D6',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(28, 28, 30, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F5F5F3',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#D1D1D6',
            },
            '&:hover fieldset': {
              borderColor: '#B8860B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#B8860B',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#8E8E93',
            '&.Mui-focused': {
              color: '#B8860B',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          fontWeight: 600,
          fontSize: '14px',
          height: '28px',
        },
        colorSuccess: {
          backgroundColor: 'rgba(52, 199, 89, 0.15)',
          color: '#34C759',
        },
        colorError: {
          backgroundColor: 'rgba(255, 59, 48, 0.15)',
          color: '#FF3B30',
        },
        colorWarning: {
          backgroundColor: 'rgba(255, 179, 0, 0.15)',
          color: '#FFB300',
        },
        colorInfo: {
          backgroundColor: 'rgba(0, 122, 255, 0.15)',
          color: '#007AFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1C1C1E',
          boxShadow: '0 1px 3px rgba(28, 28, 30, 0.05)',
          borderBottom: '1px solid #D1D1D6',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #D1D1D6',
          boxShadow: '0 -2px 8px rgba(28, 28, 30, 0.08)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#8E8E93',
          '&.Mui-selected': {
            color: '#B8860B',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(28, 28, 30, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(28, 28, 30, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAFAF8',
        },
      },
    },
  },
});

export default theme;
