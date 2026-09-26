import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Home from './pages/Home.jsx';
import BarberLogin from './pages/BarberLogin.jsx';
import BarberDashboard from './pages/BarberDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import BarberRegister from "./pages/BarberRegister.jsx";
import Spinner from "./components/Spinner.jsx";
import ErrorTab from "./components/ErrorTab.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import PublicRoutes from "./components/PublicRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import { setUser } from "./redux/features/authSlice";
import { bookingData } from "./redux/features/bookingSlice";
import { showLoading, hideLoading } from "./redux/features/alertSlice";
import { fetchServicesStart, fetchServicesSuccess, fetchServicesFailure } from "./redux/features/serviceSlice";
import { store } from "./redux/store";


function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  const { user } = useSelector((state) => state.auth);
  
  // Fetch user data and bookings on app initialization if token exists
  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return;
      }

      // Fetch user data if not already loaded
      if (!user) {
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
          }
          dispatch(hideLoading());
        } catch (error) {
          dispatch(hideLoading());
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
          }
        }
      }

      // Always fetch bookings when token exists (they might have changed)
      try {
        dispatch(showLoading());
        const res = await axios.get("/api/v1/user/getBookings");
        if (res.data.success) {
          dispatch(bookingData(res.data.data));
        }
        dispatch(hideLoading());
      } catch (err) {
        dispatch(hideLoading());
        console.error('Error fetching bookings:', err);
      }

      //Personal Booking Fetch (requires token for authentication)
    };

    // Fetch services on app initialization
    const fetchServices = async () => {
      const currentServices = store.getState().service.services;
      if (currentServices.length === 0) {
        try {
          dispatch(showLoading());
          dispatch(fetchServicesStart());
          const response = await axios.get('/api/v1/user/services');
          if (response.data.success) {
            dispatch(fetchServicesSuccess(response.data.data));
          } else {
            dispatch(fetchServicesFailure('Failed to fetch services'));
          }
          dispatch(hideLoading());
        } catch (error) {
          dispatch(hideLoading());
          dispatch(fetchServicesFailure(error.message || 'Failed to fetch services'));
        }
      }
    };

    fetchServices();


    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F9F9F6' }}>
      <ErrorTab />
      {loading && <Spinner />}
      <Router>
        <Navbar />
        <Box
          sx={{
            pt: { xs: '64px', md: '64px' },
            pb: { xs: '64px', md: 0 }, // Padding for mobile bottom nav
            minHeight: '100vh',
          }}
        >
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/barber/dashboard" element={<BarberDashboard />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path="/barber/login" element={<BarberLogin />} />
              <Route path="/barber/register" element={<BarberRegister />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;