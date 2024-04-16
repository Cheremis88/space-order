import { TOrdersData } from "@utils-types";
import { initialState, TFeedState, feedReducer } from "../services/slices/feedSlice";

const mockFeed: TOrdersData = {
  orders: [
    {
      _id: "661ed8ea97ede0001d065fd0",
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0945"
      ],
      status: "done",
      name: "Краторный space антарианский бургер",
      createdAt: "2024-04-16T20:00:42.952Z",
      updatedAt: "2024-04-16T20:00:48.647Z",
      number: 38209
    },
    {
      _id: "661ed14b97ede0001d065faf",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d"
      ],
      status: "done",
      name: "Флюоресцентный люминесцентный бургер",
      createdAt: "2024-04-16T19:28:11.396Z",
      updatedAt: "2024-04-16T19:28:13.939Z",
      number: 38208
    }
  ],
  total: 37835,
  totalToday: 59
};

const pendingState: TFeedState = {
  ...initialState,
  loading: true,
  error: ''
};

const rejectedState: TFeedState = {
  ...initialState,
  loading: false,
  error: 'Не удалось загрузить данные'
};

const fulfilledState: TFeedState = {
  feed: mockFeed,
  loading: false,
  error: ''
};

const requestActions = {
  pending: {
    type: 'feed/get/pending'
  },
  rejected: {
    type: 'feed/get/rejected'
  },
  fulfilled: {
    type: 'feed/get/fulfilled',
    payload: mockFeed
  }
};

describe('Tests for feed slice', () => {

  test('state is correct while request pending', () => {
    const state = feedReducer(initialState, requestActions.pending);
    expect(state).toEqual(pendingState);
  });

  test('state is correct when request rejected', () => {
    const state = feedReducer(initialState, requestActions.rejected);
    expect(state).toEqual(rejectedState);
  });

  test('state is correct when request fulfilled', () => {
    const state = feedReducer(initialState, requestActions.fulfilled);
    expect(state).toEqual(fulfilledState);
  });
});