import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
} from "./type";

//login user
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true 
    };
    const link = `http://localhost:5000/api/shopping/login`;
    if (email && password) {
      const { data } = await axios.post(link,{email,password }, config);
      dispatch({
        type: LOGIN_SUCCESS, 
        payload: data,
        //payload: data.user,
      });

    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Register user
export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const link = `http://localhost:5000/api/shopping/register`;
    if (userData) {
      const { data } = await axios.post(link, userData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const link = `http://localhost:5000/api/shopping/me/profile`;
    const { data } = await axios.get(link);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const logoutUser = () => async (dispatch) => {
  try {

     const config = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true 
    };
    const link = `http://localhost:5000/api/shopping/logout`;
    await axios.get(link, config);
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update user profile
export const updateProfile = (userDataUpdate) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const link = `http://localhost:5000/api/shopping/me/profile/update`;
    const { data } = await axios.put(link, userDataUpdate, config);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
