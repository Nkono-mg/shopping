import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./type";

// User auth reducer
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticatedUser: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//User register reducer
export const registerReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticatedUser: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
