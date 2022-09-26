import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: {},
};
const counterSlice = createSlice({
  name: 'firebaseStore',
  initialState,
  reducers: {
    userData: (state, action) => {
      // console.log('DATAATATATATA=========   ', action);
      state.data = action?.payload;
    },
    clearData: (state, action) => {
      // console.log('action===============   ', action);
      state.data == null;
    },
  },
});

export const {userData, clearData} = counterSlice.actions;

export default counterSlice.reducer;
