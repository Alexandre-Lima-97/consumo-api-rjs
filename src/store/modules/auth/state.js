import { createSlice} from '@reduxjs/toolkit';
import axios from '../../../services/axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedin: false,
    token: '',
    user: {},
    isLoading: false,
  },
    reducers: {
      PERSIST_REHYDRATE: () => {

      },
      loginRequest: (state) => {
        state.isLoading = true;
      },
      loginFailure: (state) => {
        delete axios.defaults.headers.Authorization;
        state.isLoading = false;
        state.isLoggedin = false;
        state.token = '';
        state.user = {};
      },
      loginSuccess: (state, actions) => {
        state.isLoggedin = true;
        state.token = actions.payload.token;
        state.user = actions.payload.user;
        // state.user = actions.payload;
        state.isLoading = false;
      }
    }
})

export const { loginRequest, loginFailure, loginSuccess } = authSlice.actions;

export default authSlice.reducer;

