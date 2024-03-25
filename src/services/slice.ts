import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { getIngredientsApi } from "@api";

type TBurgerState = {
  ingredients: TIngredient[]
}

const burgerState: TBurgerState = {
  ingredients: []
}

const burgerSlice = createSlice({
  name: 'test',
  initialState: burgerState,
  reducers: {},
  selectors: {
    selectTest: (sliceState) => {
      return sliceState.ingredients;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      });
  }
});

export const fetchTest = createAsyncThunk(
  'ingred/getAll',
  async () => getIngredientsApi()
)

export const { selectTest } = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;