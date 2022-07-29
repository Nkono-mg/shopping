import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from "./type";

//login user
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let link = `http://localhost:5000/api/shopping/login`;
    if (email && password) {
      const { data } = await axios.post(link, { email, password }, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
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
      let link = `http://localhost:5000/api/shopping/register`;
      if (userData) {
        const { data } = await axios.post(link,userData, config);
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

//Clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
