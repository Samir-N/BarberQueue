import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./features/alertSlice.js";
import authSlice from "./features/authSlice.js";
import bookingSlice from "./features/bookingSlice.js";
import serviceSlice from "./features/serviceSlice.js";

export const store = configureStore({

    reducer: {
       
        alert: alertSlice,
        auth: authSlice,
        booking: bookingSlice,
        service: serviceSlice

    }

});