import { createSlice} from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isLoading: false,
  },
    reducers: {
      registerRequest: (state) => {
        state.isLoading = true;
      },
      registerFailure: (state) => {
        state.isLoading = false;
      },
      registerSuccess: (state) => {
        state.isLoading = false;
      }
    }
})

export const { registerRequest, registerFailure, registerSuccess } = registerSlice.actions;

export default registerSlice.reducer;
