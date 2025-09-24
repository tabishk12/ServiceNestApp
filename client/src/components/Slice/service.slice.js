import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: null
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    }
  }
});

export const { setSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
