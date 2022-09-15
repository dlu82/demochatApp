import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: {},
};
const counterSlice = createSlice({
  name: 'firebaseStore',
  initialState,
  reducers: {
    userData: (state, action) => {
      console.log('DATAATATATATA=========   ', action);
      state.data = action?.payload;
    },
  },
});

export const {userData} = counterSlice.actions;

export default counterSlice.reducer;
