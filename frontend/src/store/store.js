import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';
import imagesReducer from './images';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
    images: imagesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
