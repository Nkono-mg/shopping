import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "./type";

export const getProducts = async (dispatch) => {
  try {
    await dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    const   data  = await axios.get("http://localhost:5000/api/shopping/products"); 
    await dispatch({ 
      type: ALL_PRODUCTS_SUCCESS,
      payload: data.json(),
    }); 
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

//Clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
