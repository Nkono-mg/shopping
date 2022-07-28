import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "./type";

// Get all prouducts
export const getProducts = (currentPage=1, keyword="", price, category, ratings=0) => async (dispatch) => {
  try {

    dispatch({
      type: ALL_PRODUCTS_REQUEST,
    });
    let link = "";
    if(category){
      link = `http://localhost:5000/api/shopping/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }else{
      link = `http://localhost:5000/api/shopping/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    }
    
    const   { data }  = await axios.get(link); 
    dispatch({ 
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    }); 
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL, 
      payload: error.response.data.message,
    });
  }
};

//Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const   { data }  = await axios.get(`http://localhost:5000/api/shopping/product/${id}`); 
    dispatch({ 
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    }); 
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL, 
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
