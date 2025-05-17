import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ spotId, reviewData }) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
    return response.json();
  }
);

export const loadSpotReviews = createAsyncThunk(
  'reviews/loadSpotReviews',
  async (spotId) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    return response.json();
  }
);

const initialState = {
  spotReviews: {},
  userReviews: {}
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        const { spotId, review } = action.payload;
        if (!state.spotReviews[spotId]) {
          state.spotReviews[spotId] = [];
        }
        state.spotReviews[spotId].push(review);
      })
      .addCase(loadSpotReviews.fulfilled, (state, action) => {
        const { spotId, reviews } = action.payload;
        state.spotReviews[spotId] = reviews;
      });
  }
});

export default reviewsSlice.reducer;
