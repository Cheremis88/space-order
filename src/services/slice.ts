import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrdersData } from '@utils-types';
import { TRegisterData, getIngredientsApi, getUserApi, registerUserApi, orderBurgerApi, TLoginData, loginUserApi, updateUserApi, getOrdersApi } from '@api';
import { PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TUser, TOrder } from '@utils-types';

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
  user: TUser;
  order: {
    number: number,
    request: boolean,
  };
  history: TOrder[];
  checkAuth: boolean;
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
  user: {
    name: '',
    email: ''
  },
  order: {
    number: 0,
    request: false
  },
  history: [],
  checkAuth: false,
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
    resetConstructor(state) {
      state.constructor = {
        bun: null,
        ingredients: []
      }
    },
    resetOrder(state) {
      state.order.number = 0;
    },
    moveItem(state, action: PayloadAction<[number, number]>) {
      let [index, shift] = action.payload;
      let item = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index + shift];
      state.constructor.ingredients[index + shift] = item;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    resetUser(state) {
      state.user = {
        name: '',
        email: ''
      }
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
    },
    selectUser(state) {
      return state.user;
    },
    selectAuth(state) {
      return state.checkAuth;
    },
    selectOrder(state) {
      return state.order;
    },
    selectHistory(state) {
      return state.history;
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
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.checkAuth = true;
        console.log(action.error.message);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.checkAuth = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.user);
        state.user = action.payload.user;
      })
      .addCase(orderBurger.pending, (state) => {
        state.order.request = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.order.request = false;
        console.log(action.error.message);
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order.request = false;
        state.order.number = action.payload.order.number;
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

export const fetchUser = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk('user/reg', async (user: TRegisterData) =>
  registerUserApi(user)
);

export const loginUser = createAsyncThunk('user/login', async (user: TLoginData) =>
  loginUserApi(user)
);

export const orderBurger = createAsyncThunk('order/post', async (ingreds: string[]) =>
  orderBurgerApi(ingreds)
);

export const updateUser = createAsyncThunk('user/change', async (user: TRegisterData) =>
  updateUserApi(user)
);

export const fetchHistory = createAsyncThunk('history/get', async () =>
  getOrdersApi()
);

export const { addIngredient, moveItem, removeItem, resetConstructor, resetOrder, resetUser } = mainSlice.actions;
export const {
  selectIngredients,
  selectFetchStatus,
  selectConstructor,
  selectFeeds,
  selectUser,
  selectAuth,
  selectOrder,
  selectHistory
} = mainSlice.selectors;
export const mainReducer = mainSlice.reducer;
