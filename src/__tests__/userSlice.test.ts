import { initialState, TUserState, userReducer } from "../services/slices/userSlice";

const mockUser = {
  success: true,
  user: {
    email: "superman@test.ru",
    name: "Superman"
  }
};

const pendingState: TUserState = {
  ...initialState,
};

const rejectedState: TUserState = {
  ...initialState,
  checkAuth: true
};

const fulfilledState: TUserState = {
  ...initialState,
  name: mockUser.user.name,
  email: mockUser.user.email,
  checkAuth: true
};

const requestActions = {
  pending: {
    type: 'user/get/pending'
  },
  rejected: {
    type: 'user/get/rejected',
  },
  fulfilled: {
    type: 'user/get/fulfilled',
    payload: mockUser
  }
};

describe('Tests for user slice', () => {

  test('state is correct while request pending', () => {
    const state = userReducer(initialState, requestActions.pending);
    expect(state).toEqual(pendingState);
  });

  test('state is correct when request rejected', () => {
    const state = userReducer(initialState, requestActions.rejected);
    expect(state).toEqual(rejectedState);
  });

  test('state is correct when request fulfilled', () => {
    const state = userReducer(initialState, requestActions.fulfilled);
    expect(state).toEqual(fulfilledState);
  });
});