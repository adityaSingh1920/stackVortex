import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducers/reducers'

export default configureStore({
  reducer: rootReducer
})