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
  name: 'kit',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = String(new Date().getTime());
        return { payload: { ...ingredient, id } };
      }
    },
    resetConstructor(state) {
      state.ingredients = [];
      state.bun = null;
    },
    moveItem(state, action: PayloadAction<[number, number]>) {
      let [index, shift] = action.payload;
      let item = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + shift];
      state.ingredients[index + shift] = item;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    }
  },
  selectors: {
    selectConstructor: (state) => state
  }
});

export const { addIngredient, resetConstructor, moveItem, removeItem } =
  constructorSlice.actions;
export const { selectConstructor } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;
