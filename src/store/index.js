import {combineReducers} from '@reduxjs/toolkit';

import FirbaseSlice from './Slices/FirebaseSlice';

const FirebaseReducer = combineReducers({
  firebaseStore: FirbaseSlice,
});
export default FirebaseReducer;
