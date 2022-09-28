import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer, newProductReducer
} from "./products/productReducer";
import { authReducer, updateProfileReducer } from "./users/userReducer";
import { cartReducer } from "./cart/cartReducer";

const reducer = combineReducers({
  newProduct: newProductReducer,
  products: productReducer,
  productDetails: productDetailsReducer,
  authUser: authReducer,
  updateProfile: updateProfileReducer,
  cartProduct: cartReducer,
});
let initialState = {
  cartProduct: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
