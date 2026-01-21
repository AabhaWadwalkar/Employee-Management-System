// import { createSlice,configureStore } from "@reduxjs/toolkit";

// const initial = {
//     credentials : {},
// }

// const mainReducer=createSlice({
//     name:'myreducer',
//     initialState:initial,
//     reducers:{
//         storeCredentials(state,action){
//             state.credentials=action.payload;
//         },
//         removeCredentials(state){
//             state.credentials=null;
//         }
//     }
// })

// export const actions = mainReducer.actions;
// const store = configureStore({reducer:mainReducer.reducer});
// export default store;


// store/authSlice.js

// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  wasLoggedOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.wasLoggedOut = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.wasLoggedOut = true;
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;


