const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { bookingController, bookingsFetchController, personalBookingFetchController,deleteBookingController } = require('../controllers/bookingController');
const servicesController = require('../controllers/serviceController');
const { editBookingController } = require('../controllers/bookingController');

const Router = express.Router();

Router.post('/register', (req, res) => {
  registerController(req, res);
});

Router.post('/login', (req, res) => {
  loginController(req, res);
});

Router.get('/services', servicesController);

Router.post('/bookingInfo', authMiddleware, bookingController);

Router.delete('/personalBooking/delete/:id', authMiddleware, deleteBookingController);

Router.put('/personalBooking/edit/:id', authMiddleware, editBookingController);


Router.post('/personalBookings', authMiddleware, personalBookingFetchController);

Router.get('/getBookings', (req, res) => {
  bookingsFetchController(req, res);
});

Router.post('/getUserData', authMiddleware, authController);

module.exports = Router;
