import { combineReducers } from "@reduxjs/toolkit";
import { constructorReducer } from '../services/slices/constructorSlice';
import { ingredientsReducer } from '../services/slices/ingredientsSlice';
import { feedReducer } from '../services/slices/feedSlice';
import { userReducer } from '../services/slices/userSlice';
import store from '../services/store';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  kit: constructorReducer,
  feed: feedReducer,
  user: userReducer
});

describe('Checking the rootReducer', () => {
  test('reducer returns initial state with unknown action', () => {
  expect(rootReducer(store.getState(), { type: 'unknown_action' }))
    .toEqual(store.getState());
  });
});