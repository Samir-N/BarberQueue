import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        isVisible: false,
        bookings:[],
        personalBooking:null,
    },
    reducers: {
        bookingData: (state,action) =>
        {
            state.bookings = action.payload;
        },

        showBooking: (state) => 
        {
            state.isVisible = true;
        },
        
        hideBooking: (state) => {
            state.isVisible = false;
        },
        toggleBooking: (state) => {
            state.isVisible = !state.isVisible;
        },
        insertPersonalBooking: (state, action) => {
            state.personalBooking = action.payload;
        },
        clearPersonalBooking: (state) => {
            state.personalBooking = null;
        }
    }
});

export const { insertPersonalBooking,clearPersonalBooking,showBooking, hideBooking, toggleBooking,bookingData } = bookingSlice.actions;
export default bookingSlice.reducer;

