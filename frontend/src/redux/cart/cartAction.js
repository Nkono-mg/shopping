import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART } from "./type";

export const addItemToCart = (id, quantity)=> async (dispatch, getState) => {

    const link = `http://localhost:5000/api/shopping/product/${id}`;
    const { data } = await axios.get(link);
    dispatch({
        type: ADD_TO_CART,
        payload: { 
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartProduct.cartItems));

}

export const removeItemFromCart = (id)=> async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartProduct.cartItems));

}