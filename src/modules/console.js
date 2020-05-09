import { createAction, handleActions } from "redux-actions";

export const eventsRequest = createAction("events request");
export const eventsSuccess = createAction("events success");
export const eventsFailure = createAction("events failure");

export const setResult = createAction("setResult");

const defaultState = {
  events: {
    byId: {},
    loading: false,
    error: ""
  },
  logs: []
};

export default handleActions(
  {
    [eventsRequest]: state => ({
      ...state,
      loading: true,
      errorMessage: ""
    }),
    [eventsFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    }),
    [eventsSuccess]: (state, { payload }) => ({
      ...state,
      events: {
        ...state.events,
        byId: payload,
        loading: false,
        error: ""
      }
    }),
    [setResult]: (state, { payload }) => ({
      ...state,
      logs: [...state.logs, payload]
    })
  },
  defaultState
);
