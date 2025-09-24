import { createSlice } from '@reduxjs/toolkit';
import { get } from 'mongoose';

const initialState = {
  address: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddress: (state, action) => {
      state.address = action.payload;
    },
    clearAddressInfo: (state) => {
      state.address = '';
      state.selectedService = null;
    },
  },
});

export const {
  saveAddress,
  clearAddressInfo,
} = addressSlice.actions;

export default addressSlice.reducer;
