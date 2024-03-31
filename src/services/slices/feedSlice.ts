import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = {
  feed: TOrdersData | null;
  loading: boolean;
  error: string;
};

const initialState: TFeedState = {
  feed: null,
  loading: true,
  error: ''
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.loading = false;
        state.error = '';
      });
  }
});

export const fetchFeed = createAsyncThunk(
  'feed/get',
  async () => getFeedsApi()
);

export const { selectFeed } = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;