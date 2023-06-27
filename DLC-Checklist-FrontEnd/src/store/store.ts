import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
// import AuthReducer from '../auth/reducer';

export default configureStore({
  reducer: rootReducer,
})
