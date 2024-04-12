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

test('Check store state with unknown action', () => {
  expect(store.getState())
    .toEqual(rootReducer(undefined, { type: 'unknown action' }));
});