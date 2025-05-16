import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../csrf';

export const fetchSpots = createAsyncThunk(
  'spots/fetchSpots',
  async () => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    return data;
  }
);

export const fetchSpot = createAsyncThunk(
  'spots/fetchSpot',
  async (spotId) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    return data;
  }
);

export const createSpot = createAsyncThunk(
  'spots/createSpot',
  async (spotData) => {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(spotData)
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  allSpots: {},
  singleSpot: null,
  loading: false,
  error: null
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpots.fulfilled, (state, action) => {
        state.loading = false;
        state.allSpots = action.payload.Spots;
      })
      .addCase(fetchSpots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSpot.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSpot = action.payload;
      })
      .addCase(createSpot.fulfilled, (state, action) => {
        state.allSpots[action.payload.id] = action.payload;
      });
  }
});

export default spotsSlice.reducer;
