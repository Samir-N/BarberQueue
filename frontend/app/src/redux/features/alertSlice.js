import {createSlice} from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        loading: false,
        message: null,
        type: null,
        open: false,
        duration: 3000 
    },

    reducers: {

    showLoading: (state) => {state.loading = true},

    hideLoading: (state) => {state.loading = false},

    showAlert: (state, action) => {
        state.message = action.payload.message;
        state.type = action.payload.type;
        state.open = true;
        // Allow custom duration, default to 4000ms
        state.duration = action.payload.duration || 3000;
    },

    hideAlert: (state) => {
        state.open = false;
        state.message = null;   
        state.type = null;
    }

    }
});

export const { showLoading, hideLoading, showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
