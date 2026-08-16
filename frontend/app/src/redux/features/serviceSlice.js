import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchServicesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchServicesSuccess: (state, action) => {
            state.loading = false;
            state.services = action.payload;
            state.error = null;
        },
        fetchServicesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.services = [];
        },
        clearServices: (state) => {
            state.services = [];
            state.error = null;
        }
    }
});

export const { fetchServicesStart, fetchServicesSuccess, fetchServicesFailure, clearServices } = serviceSlice.actions;
export default serviceSlice.reducer;

