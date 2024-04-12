import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export type TIngredientsState = {
  all: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string;
};

export const initialState: TIngredientsState = {
  all: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: true,
  error: ''
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state
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
        state.all = action.payload;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
        state.loading = false;
        state.error = '';
      });
  }
});

export const fetchIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

export const { selectIngredients } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
