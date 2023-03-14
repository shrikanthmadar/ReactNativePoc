import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feature/counterSlice'
import galleryReducer from '../feature/gallerySlice'

export default configureStore({
    
  reducer: {
    counter: counterReducer,
    gallery:galleryReducer
  }
})