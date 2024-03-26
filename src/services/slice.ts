import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrdersData } from '@utils-types';
import { getIngredientsApi } from '@api';
import { PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

type TAppState = {
  ingredients: {
    all: TIngredient[];
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
  constructor: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  feeds: TOrdersData | null;
  loading: boolean;
  error: string;
};

const appState: TAppState = {
  ingredients: {
    all: [],
    buns: [],
    mains: [],
    sauces: []
  },
  constructor: {
    bun: null,
    ingredients: []
  },
  feeds: null,
  loading: true,
  error: ''
};

const mainSlice = createSlice({
  name: 'main',
  initialState: appState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      action.payload.type === 'bun'
        ? (state.constructor.bun = action.payload)
        : state.constructor.ingredients.push(action.payload);
    },
    moveItem(state, action: PayloadAction<[number, number]>) {
      let index = action.payload[0];
      let sign = action.payload[1];
      let item = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index + sign];
      state.constructor.ingredients[index + sign] = item;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (item) => item.id !== action.payload
      );
    }
  },
  selectors: {
    selectIngredients(state) {
      return state.ingredients;
    },
    selectConstructor(state) {
      return state.constructor;
    },
    selectFetchStatus(state) {
      return [state.loading, state.error];
    },
    selectFeeds(state) {
      return state.feeds;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients.all = action.payload;
        state.ingredients.buns = action.payload.filter(
          (item) => item.type === 'bun'
        );
        state.ingredients.mains = action.payload.filter(
          (item) => item.type === 'main'
        );
        state.ingredients.sauces = action.payload.filter(
          (item) => item.type === 'sauce'
        );
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
        state.loading = false;
        state.error = '';
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const { addIngredient, moveItem, removeItem } = mainSlice.actions;
export const {
  selectIngredients,
  selectFetchStatus,
  selectConstructor,
  selectFeeds
} = mainSlice.selectors;
export const mainReducer = mainSlice.reducer;
