import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      action.payload.type === 'bun'
        ? (state.bun = action.payload)
        : state.ingredients.push(action.payload);
    },
    resetConstructor(state) {
      state = {
        bun: null,
        ingredients: []
      };
    },
    moveItem(state, action: PayloadAction<[number, number]>) {
      let [index, shift] = action.payload;
      let item = state.ingredients[index];
      state.ingredients[index] =
        state.ingredients[index + shift];
      state.ingredients[index + shift] = item;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  selectors: {
    selectConstructor: (state) => state
  }
});

export const { selectConstructor } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;