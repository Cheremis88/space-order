import {
  constructorReducer,
  addIngredient,
  moveItem,
  removeItem,
  resetConstructor,
  TConstructorState
} from '../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockState: TConstructorState = {
  bun: null,
  ingredients: [
    {
      _id: 'test_1',
      id: 'test1',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: '',
      image_mobile: '',
      image_large: ''
    },
    {
      _id: 'test_2',
      id: 'test2',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: '',
      image_mobile: '',
      image_large: ''
    },
    {
      _id: 'test_3',
      id: 'test3',
      name: 'Какая-то новинка',
      type: 'new_type',
      proteins: 100,
      fat: 50,
      carbohydrates: 80,
      calories: 200,
      price: 333,
      image: '',
      image_mobile: '',
      image_large: ''
    }
  ]
};

const mockBun: TConstructorIngredient = {
  _id: 'test_4',
  id: 'test4',
  name: 'Булочка',
  type: 'bun',
  proteins: 222,
  fat: 111,
  carbohydrates: 90,
  calories: 350,
  price: 99,
  image: '',
  image_mobile: '',
  image_large: ''
}

const mockIngredient: TConstructorIngredient = {
  _id: 'test_5',
  id: 'test5',
  name: 'Добавленный ингредиент',
  type: 'salad',
  proteins: 65,
  fat: 5,
  carbohydrates: 77,
  calories: 2,
  price: 44,
  image: '',
  image_mobile: '',
  image_large: ''
}

const afterMoveState: TConstructorState = {
  bun: null,
  ingredients: [
    mockState.ingredients[1],
    mockState.ingredients[0],
    mockState.ingredients[2],
  ]
};

const afterRemoveState: TConstructorState = {
  bun: null,
  ingredients: [
    mockState.ingredients[0],
    mockState.ingredients[2],
  ]
};

describe('Tests for constructor slice', () => {
  
  test('add ingredient (including bun)', () => {
    let testState = constructorReducer(
      mockState,
      addIngredient(mockBun)
    );
    expect(testState.bun?._id).toBe('test_4');

    testState = constructorReducer(
      mockState,
      addIngredient(mockIngredient)
    );
    expect(testState.ingredients.length)
      .toBe(mockState.ingredients.length + 1);
    expect(testState.ingredients.at(-1)?._id)
      .toBe('test_5');
  });

  test('move up/down ingredient', () => {
    let testState = constructorReducer(
      mockState,
      moveItem([1, -1])
    );
    expect(testState).toEqual(afterMoveState);

    testState = constructorReducer(
      mockState,
      moveItem([0, 1])
    );
    expect(testState).toEqual(afterMoveState);
  });

  test('remove ingredient', () => {
    let testState = constructorReducer(
      mockState,
      removeItem('test2')
    );
    expect(testState).toEqual(afterRemoveState);
  });

  test('reset constructor', () => {
    let testState = constructorReducer(
      mockState,
      resetConstructor()
    );
    expect(testState).toEqual({ bun: null, ingredients: [] });
  });
});