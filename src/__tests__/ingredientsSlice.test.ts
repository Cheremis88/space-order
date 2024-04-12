import { TIngredient } from "@utils-types";
import { initialState, TIngredientsState, ingredientsReducer } from "../services/slices/ingredientsSlice";

const mockIngredients: TIngredient[] = [
  {
    _id: 'test_1',
    name: 'Булочка',
    type: 'bun',
    proteins: 65,
    fat: 5,
    carbohydrates: 77,
    calories: 2,
    price: 44,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: 'test_2',
    name: 'Начинка',
    type: 'main',
    proteins: 75,
    fat: 15,
    carbohydrates: 87,
    calories: 55,
    price: 340,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: 'test_3',
    name: 'Соус',
    type: 'sauce',
    proteins: 105,
    fat: 35,
    carbohydrates: 47,
    calories: 22,
    price: 66,
    image: '',
    image_mobile: '',
    image_large: ''
  },
];

const pendingState: TIngredientsState = {
  ...initialState,
  loading: true,
  error: ''
}

const rejectedState: TIngredientsState = {
  ...initialState,
  loading: false,
  error: 'Не удалось загрузить данные'
}

const fulfilledState: TIngredientsState = {
  all: mockIngredients,
  buns: [mockIngredients[0]],
  mains: [mockIngredients[1]],
  sauces: [mockIngredients[2]],
  loading: false,
  error: ''
}

const requestActions = {
  pending: {
    type: 'ingredients/get/pending'
  },
  rejected: {
    type: 'ingredients/get/rejected'
  },
  fulfilled: {
    type: 'ingredients/get/fulfilled',
    payload: mockIngredients
  }
};

describe('Tests for ingredients slice', () => {

  test('state is correct while request pending', () => {
    const state = ingredientsReducer(initialState, requestActions.pending);
    expect(state).toEqual(pendingState);
  });

  test('state is correct when request rejected', () => {
    const state = ingredientsReducer(initialState, requestActions.rejected);
    expect(state).toEqual(rejectedState);
  });

  test('state is correct when request fulfilled', () => {
    const state = ingredientsReducer(initialState, requestActions.fulfilled);
    expect(state).toEqual(fulfilledState);
  });
});