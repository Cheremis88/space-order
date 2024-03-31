import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { getOrdersApi, updateUserApi, orderBurgerApi, loginUserApi, registerUserApi, getUserApi, TRegisterData, TLoginData } from '@api';

type TUserState = TUser & {
  orders: TOrder[];
  lastOrder: number;
  checkAuth: boolean;
  loading: boolean;
  error: string;
};

const initialState: TUserState = {
  name: '',
  email: '',
  orders: [],
  lastOrder: 0,
  checkAuth: false,
  loading: true,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetOrder(state) {
      state.lastOrder = 0;
    },
    resetUser(state) {
      state.name = '';
      state.email = '';
    }
  },
  selectors: {
    selectUserName: (state) => state.name,
    selectOrders: (state) => state.orders,
    selectLastOrder: state => state.lastOrder,
    selectAuth: state => state.checkAuth,
    selectStatus: state => [state.loading, state.error]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить данные';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.checkAuth = true;
        state.error = action.error.message || '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.checkAuth = true;
        state.loading = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Неверный адрес почты или пароль';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload.order.number;
      });
  }
});

export const fetchUser = createAsyncThunk('user/get', async () => getUserApi());

export const registerUser = createAsyncThunk(
  'user/reg',
  async (user: TRegisterData) => registerUserApi(user)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: TLoginData) => loginUserApi(user)
);

export const orderBurger = createAsyncThunk(
  'order/post',
  async (ingreds: string[]) => orderBurgerApi(ingreds)
);

export const updateUser = createAsyncThunk(
  'user/change',
  async (user: TRegisterData) => updateUserApi(user)
);

export const fetchOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

export const { selectUserName, selectOrders, selectLastOrder, selectAuth, selectStatus } = userSlice.selectors;
export const userReducer = userSlice.reducer;